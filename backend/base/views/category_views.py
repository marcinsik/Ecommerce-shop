from django.http import JsonResponse
from base.serializers import SubcategorySerializer, SubSubcategorySerializer, CategorySerializer
from rest_framework.response import Response
from base.models import Subcategory, SubSubcategory, Category
from rest_framework.decorators import api_view

@api_view(['GET'])
def subcategory_list(request):
    subcategories = Subcategory.objects.all()
    serializer = SubcategorySerializer(subcategories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def subSubCategory_list(request):
    subSubCategories = SubSubcategory.objects.all()
    serializer = SubSubcategorySerializer(subSubCategories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Category_list(request):
    Categories = Category.objects.all()
    serializer = CategorySerializer(Categories, many=True)
    return Response(serializer.data)


