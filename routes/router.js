// to define routes for client request,create routes folder and router.js file

// import express
const express=require('express')

// import productcontroller
const productcontroller=require('../controllers/productController')

// import wishlistcontroller
const wishlistcontroller=require('../controllers/wishlistController')

// import cartcontroller
const cartcontroller=require('../controllers/cartController')

// using express create object for router class inorder to setup path
const router=new express.Router()

// resolve client request in various server routes

// api
// get-all products
router.get('/products/all-products',productcontroller.getallproducts)
// view-product/id
router.get('/products/view-product/:id',productcontroller.viewproduct)
// add-to-wishlist
router.post('/wishlist/add-product',wishlistcontroller.addtowishlist)
// get-wishlist-item
router.get('/wishlist/get-items',wishlistcontroller.getwishlistItems)
// remove wishlist item
router.delete('/wishlist/remove-item/:id',wishlistcontroller.removefromwishlist)
// add to cart
router.post('/cart/add-product',cartcontroller.addtocart)
// get-cart
router.get('/cart/all-products',cartcontroller.getcart)

// remove cart itme
router.delete('/cart/remove-item/:id',cartcontroller.removecartitem)

// empty cart
router.delete('/cart/remove-all-items',cartcontroller.emptycart)

// increment quantity
router.get('/cart/increment-quantity/:id',cartcontroller.incrementCount)
// decrement quantity
router.get('/cart/decrement-quantity/:id',cartcontroller.decrementCartQuantity)


// export router
module.exports=router
