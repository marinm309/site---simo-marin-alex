from django.contrib import admin
from . models import Product, Favorite, ProductImage, CarProduct, ClotheProduct

class ProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Product._meta.fields]
    prepopulated_fields = {"slug": ('title',)}

admin.site.register(Product, ProductAdmin)
admin.site.register(Favorite)
admin.site.register(ProductImage)
admin.site.register(CarProduct)
admin.site.register(ClotheProduct)
