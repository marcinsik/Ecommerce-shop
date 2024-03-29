# Ecommerce-shop
![homepage](https://github.com/marcinsik/Ecommerce-shop/blob/b2952e8cdea49e5c4caedb67933d19e63e382330/homepage.png)


This is an ecommerce shop built using Django and React. It provides a platform for users to browse, purchase, and manage products.

# Current features
Users: Users can create accounts, create a review, change email or password, log in, and log out. 

Order Management: Registered users can view their order history, including details of past purchases.

Shopping cart: Users can add products to their shopping cart, modify quantities, and remove items. The shopping cart retains items even after the user logs out.

Checkout Process: Users can proceed to checkout, enter their shipping and payment details, and complete the purchase. The shop integrates with a payment gateway to process payments securely.

Product Catalog: The shop displays a catalog of products available for purchase. Users can browse products by category, search for specific products, filter by brand, price, and view individual product details.

Admin Interface: An admin interface is provided for shop administrators to manage products, categories, and orders. Administrators can add, edit, and delete products, view and process orders, and perform other administrative tasks.

# Installation
1. Clone the repository:
- git clone <repository-url>
  
2. Set up the backend:
- cd backend 

Set up the database by running migrations:
- python manage.py migrate

Start the backend server:
- python manage.py runserver

Set up the frontend:
 - cd frontend

Start the frontend development server:
- npm start

Access the ecommerce shop in your web browser at http://localhost:3000.
