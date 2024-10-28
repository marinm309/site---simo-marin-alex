from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Product, Favorite
from .serializers import ProductSerializer, FavoriteSerializer
from django.contrib.auth import get_user_model
from user_api.serializers import SingleUserSerializer

UserModel = get_user_model()

class ProductListCreateAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        category = request.query_params.get('category', None)
        profile = request.query_params.get('profile', None)
        total_results = request.query_params.get('total_results', None)
        search = request.query_params.get('search', None)
        subcategory = request.query_params.get('subcategory', None)
        if category:
            products = Product.objects.filter(category__slug=category)
        elif subcategory:
            pass
            #products = Product.objects.filter(subcategory__slug=subcategory)
        elif profile:
            products = Product.objects.filter(user__user_id=profile)
        elif total_results:
            products = Product.objects.all()[Product.objects.count() - int(total_results):]
        elif search:
            products = Product.objects.filter(title__icontains=search)
        else:
            products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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

        product_serializer = ProductSerializer(product)
        similar_products_serializer = ProductSerializer(similar_products, many=True)
        other_user_products_serializer = ProductSerializer(other_user_products, many=True)

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

class FavoriteAPIView(APIView):


    def get(self, request, slug):
        favorite = get_object_or_404(Favorite, slug=slug)
        serializer = FavoriteSerializer(favorite)
        return Response(serializer.data)

    def post(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        favorite, created = Favorite.objects.get_or_create(user=request.user, product=product)

        if not created:
            return Response({"detail": "You have already put that in favorite."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "You put that in favorite."}, status=status.HTTP_201_CREATED)

    def delete(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        Favorite.objects.filter(user=request.user, product=product).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)