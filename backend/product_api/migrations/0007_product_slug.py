# Generated by Django 5.0.7 on 2024-10-18 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product_api', '0006_product_phone_number_product_subcategory_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='slug',
            field=models.SlugField(blank=True, default='', null=True),
        ),
    ]