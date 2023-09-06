from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from base.products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.models import Product, Review, Category, Subcategory, SubSubcategory 
from django.contrib.auth.models import User 
from base.serializers import ProductSerializer, CategorySerializer
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True) 
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id = pk)
    product.delete()

    return Response('Produkt został usunięty.')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    
    category = Category.objects.get(id=3)
    subCategory = Subcategory.objects.get(id=12)
    subSubCategory = SubSubcategory.objects.get(id=7)
    
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'sample',
        price = 0,
        brand = 'sample',
        countInStock = 0,
        category = category,
        subCategory = subCategory,
        subSubCategory = subSubCategory,
        description = 'sample'        
        )   
    
    
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id = pk)
    
    category_id = data['category']
    category = Category.objects.get(id=category_id)
    product.category = category
    
    subcategory_id = data['subCategory']
    subcategory = Subcategory.objects.get(id=subcategory_id)
    product.subCategory = subcategory
    
    subsubcategory_id = data['subSubCategory']
    subsubcategory = SubSubcategory.objects.get(id=subsubcategory_id)
    product.subSubCategory = subsubcategory
    
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.save()
    
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)