// import cart collection
const cartitems=require('../models/cartSchema')

// add to cart
exports.addtocart=async (req,res)=>{
    // get product details from req
    const {id,title,image,price,quantity}=req.body

    // logic
    try{

        // check product is in cart collection
        const product =await cartitems.findOne({id})
        if(product){
            // product is in cart
            // increment product quantity
            product.quantity+=1
            // update grandtotal
            product.grantTotal=product.price*product.quantity
            // to save changes in mongodb
            product.save()
            res.status(200).json("items added to your cart....")
        }
        else{
            // product is not in cart
            // add product to cart
            const  newProduct = new cartitems({
                id,title,price,image,quantity,grantTotal:price
                })
            // save new product to mongodb
            await newProduct.save()
            res.status(200).json("item added to your cart....")

        }

    }
    catch(error){
        res.status(401).json(error)

    }
}

// get cart
exports.getcart=async (req,res)=>{
    try{
        const allitems =await cartitems.find()
        res.status(200).json(allitems)
    }
    catch(error){
        res.status(401).json(error)

    }
}

// remove cart item
exports.removecartitem=async (req,res)=>{
    // get id from req
    const {id} =req.params

    // remove id from wishlist collection
    try{
        const removeItem=await cartitems.deleteOne({id})
        if(removeItem){
            // get all wishlist item after removing the particular item
            const allItems=await cartitems.find()
            res.status(200).json(allItems)

        }
        else{
            res.status(404).json("items not present in your cart")

        }

    }
    catch(error){
        res.status(401).json(error)


    }
}

// empty carts
exports.emptycart=async (req,res)=>{
    try{
        await cartitems.deleteMany({})
        res.status(200).json("Your Cart is empty Now...")

    }
    catch(error){
        res.status(401).json(error)
    }
}
 
// increment quantity
exports.incrementCount=async(req,res)=>{
    const {id} =req.params
    try{
        // check products is in the cart collection
        const product=await cartitems.findOne({id}) 
        if(product){
            // update quantity
            product.quantity+=1
            product.grantTotal=product.price*product.quantity
            // to save changes in mongodb
            await product.save()
             // get all wishlist item after removing the particular item
 const allItems=await cartitems.find()
 res.status(200).json(allItems)


        }
        else{
            res.status(404).json("product is not in your cart")


        }
    }
    catch(error){
        res.status(401).json(error)

    }
}

// decrement cart quantity
exports.decrementCartQuantity=async(req,res)=>{
    const {id} =req.params
    try{
        // check products is in the cart collection
        const product=await cartitems.findOne({id}) 
        if(product){
            // update quantity
            product.quantity-=1
            // check quantity=0
            if(product.quantity==0){
                // remove product from cart collection
                await cartitems.deleteOne({id})
                             // get all cart collection after removing the particular item

              const allItems=await cartitems.find()
               res.status(200).json(allItems)
            }
            else{
                product.grantTotal=product.price*product.quantity

            }
            // to save changes in mongodb
            await product.save()
             // get all cart collection after update the particular item count
 const allItems=await cartitems.find()
 res.status(200).json(allItems)


        }
        else{
            res.status(404).json("product is not in your cart")


        }
    }
    catch(error){
        res.status(401).json(error)

    }
}