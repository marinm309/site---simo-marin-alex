# Generated by Django 5.0.7 on 2024-08-09 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0002_remove_appuser_username_appuser_is_staff_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='name',
            field=models.CharField(default='guest', max_length=50),
            preserve_default=False,
        ),
    ]