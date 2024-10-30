from django.db import models
from django.contrib.auth import get_user_model
from category_api.models import Category, Subcategory
from django.core.validators import RegexValidator

UserModel = get_user_model()

class Product(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(default="")
    description = models.TextField(max_length=600)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{1,10}$')], null=True, blank=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
    last_updated = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.title

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class CarProduct(Product):
    make = models.CharField(max_length=50) 
    model = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    mileage = models.PositiveIntegerField()
    fuel_type = models.CharField(max_length=20, choices=[('petrol', 'Petrol'), ('diesel', 'Diesel'), ('electric', 'Electric'), ('hybrid', 'Hybrid')])
    transmission = models.CharField(max_length=20, choices=[('manual', 'Manual'), ('automatic', 'Automatic')])

    def __str__(self):
        return self.model
    
class ClotheProduct(Product):
    brand = models.CharField(max_length=50)
    new = models.BooleanField()

    def __str__(self):
        return self.brand

class Favorite(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.product.title
