from django.urls import path
from base.views import category_views as views

urlpatterns = [
    path('subcategories/', views.subcategory_list, name='subcategory_list'),
    path('subsubcategories/', views.subSubCategory_list, name='sub-sub-category_list'),
    path('categories/', views.Category_list, name='category_list'),
    
    
    
]