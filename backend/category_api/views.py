from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import Category, Subcategory
from .serializers import CategorySerializer, SingleCategorySerializer

class CategoryAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
class SingleCategoryAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request, pk):
        subcategories = Subcategory.objects.filter(category__id=pk)
        serializer = SingleCategorySerializer(subcategories, many=True)
        return Response(serializer.data)