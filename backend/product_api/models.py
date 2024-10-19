from django.db import models
from django.contrib.auth import get_user_model
from category_api.models import Category, Subcategory
from django.core.validators import RegexValidator

UserModel = get_user_model()

class Product(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(default="", null=True, blank=True)
    description = models.TextField(max_length=600)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{1,10}$')], null=True, blank=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, blank=True, null=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class Favorite(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.product.title
