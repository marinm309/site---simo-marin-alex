# Generated by Django 5.0.7 on 2024-10-29 13:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product_api', '0010_carproduct_alter_product_address_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClotheProduct',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='product_api.product')),
                ('brand', models.CharField(max_length=50)),
                ('new', models.BooleanField()),
            ],
            bases=('product_api.product',),
        ),
    ]
