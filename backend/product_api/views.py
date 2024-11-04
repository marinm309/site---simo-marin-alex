from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Product, Favorite, ProductImage
from .serializers import ProductSerializer, FavoriteSerializer, ProductCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework.authentication import SessionAuthentication

UserModel = get_user_model()

class ProductListCreateAPIView(APIView):
    def get(self, request):
        category = request.query_params.get('category', None)
        profile = request.query_params.get('profile', None)
        total_results = request.query_params.get('total_results', None)
        search = request.query_params.get('search', None)
        subcategory = request.query_params.get('subcategory', None)
        favorite = request.query_params.get('favorite', None)

        if request.FILES and len(request.FILES.getlist('images')) > 8:
            return Response({"error": "You can upload up to 8 images."}, status=400)

        if category:
            products = Product.objects.filter(category__slug=category)
        elif subcategory:
            products = Product.objects.filter(subcategory__slug=subcategory)
        elif profile:
            products = Product.objects.filter(user__user_id=profile)
        elif total_results:
            products = Product.objects.all()[Product.objects.count() - int(total_results):]
        elif search:
            products = Product.objects.filter(title__icontains=search)
        elif favorite == 'items':
            products = Product.objects.filter(favorite__user=request.user).order_by('-favorite__created_at')
        else:
            products = Product.objects.all()

        user_favorites = {}
        if request.user.is_authenticated:
            favorite_product_ids = Favorite.objects.filter(user=request.user).values_list('product_id', flat=True)
            user_favorites = {product_id: True for product_id in favorite_product_ids}
        serializer = ProductSerializer(products, many=True, context={'user_favorites': user_favorites})
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductCreateSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            images = request.FILES.getlist('images')
            for image in images:
                ProductImage.objects.create(image=image, product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductRetrieveUpdateDestroyAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        user = get_object_or_404(UserModel, user_id=product.user.user_id)
        similar_products = Product.objects.filter(category=product.category).exclude(user=user)
        other_user_products = Product.objects.filter(user=user)

        other_user_products = other_user_products.filter(subcategory=product.subcategory).exclude(id=product.id) or other_user_products.filter(category=product.category).exclude(id=product.id)

        if other_user_products.count() > 2:
            other_user_products = other_user_products[:2]

        user_favorites = {}
        favorite_product_ids = Favorite.objects.filter(user=user).values_list('product_id', flat=True)
        user_favorites = {product_id: True for product_id in favorite_product_ids}

        product_serializer = ProductSerializer(product, context={'user_favorites': user_favorites})
        similar_products_serializer = ProductSerializer(similar_products, many=True, context={'user_favorites': user_favorites})
        other_user_products_serializer = ProductSerializer(other_user_products, many=True, context={'user_favorites': user_favorites})

        response_data = product_serializer.data
        response_data['similarItems'] = similar_products_serializer.data
        response_data['otherUserItems'] = other_user_products_serializer.data
        return Response(response_data, status=status.HTTP_200_OK)

    def put(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class AllFavoriteUserAPIView(APIView):
    def get(self, request):
        products = Product.objects.filter(favorite__user=request.user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class FavoriteAPIView(APIView):
    # def get(self, request, slug):
    #     print('here')
    #     favorites = Favorite.objects.filter(user=request.user)   
    #     serializer = FavoriteSerializer(favorites, many=True)
    #     return Response(serializer.data)

    def post(self, request, slug):
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"details": "Created"}, status=status.HTTP_201_CREATED)
        return Response({"detail": "You have already put that in favorite."}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        favorite = Favorite.objects.filter(user=request.user, product=product).first()
        
        if favorite:
            favorite.delete()
            return Response({"detail": "Successfully removed from favorites."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "Favorite item not found."}, status=status.HTTP_404_NOT_FOUND)