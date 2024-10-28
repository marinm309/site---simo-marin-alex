from rest_framework import serializers
from .models import Product, Favorite
from django.utils import formats
from category_api.serializers import CategorySerializer, SingleCategorySerializer
from user_api.serializers import SingleUserSerializer

class ProductSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    last_updated = serializers.SerializerMethodField()
    category = CategorySerializer()
    subcategory = SingleCategorySerializer()
    user = SingleUserSerializer()
    
    class Meta:
        model = Product
        fields = '__all__'

    def get_created_at(self, obj):
        return formats.date_format(obj.created_at, format="d E Y г.", use_l10n=True)
    
    def get_last_updated(self, obj):
        return formats.date_format(obj.last_updated, format="d E Y г.", use_l10n=True)

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'
