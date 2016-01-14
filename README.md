# Team-9-Telerik
---

## Team Members
* Aleksandra Stoycheva
* Ivaylo Arnaudov
* Vladimir Iliev

## Auction System

Web site for product orders

## Applicataion Logic 

 -	Users can register
 - 	Administrators are initially seeded
 -	Users (Admins) can list, order and post products
 -	There is public availible data such as bassic info about Products
 -  Private part for autheticated users such as details about products and ability to order products
 -  Admin part for admins with admin panel to manage data
 - Server side paging and sorting;

 ## RESTful API Overview
| HTTP Method | Web service endpoint | Description |
|:----------:|:-----------:|:-------------|
|GET (for admins)| /admin/home| Home page for admins |
|GET (for admins)| /admin/categories/add | Adds new category|
|GET (for admins)|/admin/products/:id/delete| Get form to delete product|
|GET (for admins)|/admin/users/all|Loads all users|
|GET (for admins)| /admin/users/:username/edit| Load edit form for user |
|GET (for admins)| /admin/users/:username/delete | Get Form to delete user|
|GET (for admins)|/admin/categories/delete| Delete category|
|GET (for admins)|/admin/users/:username/orders| Loads all orders per user|
|POST (for admins)|/admin/users/:username/edit| Edits username |
|POST (for admins)|/admin/categories/delete| Deletes category |
|POST (for admins)|/admin/users/:username/edit| Edits username |
|GET (for users)|/home/categories/:id/addProduct| Get Add product forme |
|GET (for users)|/home/categories/:id| Gets products by Category ID |
|POST (for users)|/login| Logins user |
|GET (for users)|/logout| Logouts user |
|GET (for users)|/products/details/:id| Gets details about product |
|GET (for users)|/products//details/:id/orders| Gets product orders |
|POST (for users)|/products/details/:id/order| Orders product |
|GET (for users)|/profile/orders|Orders per user |
|GET (for users)|/profile| GUser profile|


###### Telereik-Academy Season 2015-2016 
