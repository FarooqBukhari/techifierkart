# Project : TechifierKart

# Group Members: 
Farooq Shah 16L-4180 
Fawad Omer 16L-4022 
Sajjad Zaidi 16L-4035
Rouel Shafi 16L-4163

# About TechifierKart:
TechifierKart is an online shop for Computer Parts. We Help PC Master Race to buy and assemble all the best parts out there , for the ultimate and budget friendly Gaming Experience.

# HomePage:
Heroku App URL: http://techifierkart.herokuapp.com/

# UseCases:

# Admin.
(https://techifierkart.herokuapp.com/admin/panel)
1. Admin can Add a new Product.
2. Admin can Edit an existing Product.
3. Admin can Delete a Product.
# Note: 
admin Priviliges are manually granted to a user after simple user sign up by editing the mlab database: I.E. setting adminPrivilidges to true in users Collection.
Email me at "l164180@lhr.nu.edu.pk" for admin account information to test the admin panel features.

# User.
1. User can buy a product.
(https://techifierkart.herokuapp.com/)
(https://techifierkart.herokuapp.com/product/GamingPeriphirels) Here GamingPeriphirels can be replaced with any category the site offers.
2. User can view any Product's Specs, description, quantity, that is displayed on the site by clicking on the view button.
3. User can write a review.
4. User can edit or Delete his/her own review.
(https://techifierkart.herokuapp.com/product/view/5be70579687c3000157e47c5) Go to write review tab.

# Schema:
1. Collections: Products , Users, Orders , Sessions
2. Nested Collections: Cart, Reviews (Products has nested reviews,Orders has nested Cart).

# Ajax & AngularJs:
1. Remote Email Validation(Format and Availablility)
2. Search AutoComplete
3. Dynamic Products Injection according to category

# Contribution:
Farooq Shah:
1. Wrote the code for both front-end and back-end.
2. Implemented Use Case For Admin.
3. Implemented Session Management through Passport and Csrf(Token Method) module.
4. Implemented back-end error and exception handling for all use cases.
5. Implemented Stripe Payment Method through Credit Cards when user checks out.
6. Protected User and Admin Specific Routes, to not be accessed without their respective login.
7. Implemented Cart Storage into Session until User Checksout or his/her session expires.
8. Implemented AJAX and AngularJs

Rouel Shafi:
1. Implemented Use Case For User.
2. Product Scraping through Python Scripting.
3. Updating product average rating after a user gives, edits or deletes a review.

Sajjad Zaidi:
1. Designed and coded the views.
2. Implemented SignIn/Up and Logout features.

Fawad Omer:
1. Implemented front-end input form validations for all the views.
2. Designed the Schema.

# Future Work
1. Deducting product quantity from the store when it is bought.


