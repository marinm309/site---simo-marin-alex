from django.contrib import admin
from.models import Category, Subcategory

class CategoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Category._meta.fields]
    prepopulated_fields = {"slug": ('name',)}

class SubcategoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Subcategory._meta.fields]
    prepopulated_fields = {"slug": ('name',)}
  
admin.site.register(Category, CategoryAdmin)
admin.site.register(Subcategory, SubcategoryAdmin)