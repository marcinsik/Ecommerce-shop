# Generated by Django 4.2.1 on 2023-09-06 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_category_subcategory_subsubcategory_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/sample.jpg', null=True, upload_to=''),
        ),
    ]