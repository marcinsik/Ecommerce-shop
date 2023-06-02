# Generated by Django 4.2.1 on 2023-06-02 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_product_category_alter_product_subcategory_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subcategory',
            name='parent_category',
        ),
        migrations.RemoveField(
            model_name='subsubcategory',
            name='parent_subcategory',
        ),
        migrations.RemoveField(
            model_name='product',
            name='subCategory',
        ),
        migrations.RemoveField(
            model_name='product',
            name='subSubCategory',
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Subcategory',
        ),
        migrations.DeleteModel(
            name='SubSubcategory',
        ),
    ]