from django.db import models
from django.contrib.auth import get_user_model
from category_api.models import Category, Subcategory
from django.core.validators import RegexValidator
from django.utils.text import slugify

UserModel = get_user_model()

class Product(models.Model):
    PRICE_CHOICES = [
        ('free', 'Free'),
        ('negotiation', 'Negotiation'),
    ]

    CURRENCY_CHOICES = [
        ('leva', 'Leva'),
        ('euro', 'Euro'),
        ('dollar', 'Dollar'),
    ]

    ITEM_TYPE_CHOICES = [
        ('o', 'Option O'),
        ('s', 'Option S'),
    ]

    title = models.CharField(max_length=100)
    slug = models.SlugField(default="")
    description = models.TextField(max_length=600)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_other = models.CharField(max_length=50, choices=PRICE_CHOICES, default='negotiation', null=True, blank=True)
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES, default='leva', null=True, blank=True)
    item_type = models.CharField(max_length=1, choices=ITEM_TYPE_CHOICES, default='o')
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{1,10}$')], null=True, blank=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
    last_updated = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            num = 1
            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{num}"
                num += 1
            self.slug = slug
        super().save(*args, **kwargs)

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
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True, related_name='favorite')
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.product.title
