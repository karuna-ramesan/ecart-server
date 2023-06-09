// import wishlist 

const wishlists=require('../models/wishlistSchema')

// add to wishlist
exports.addtowishlist=async(req,res)=>{
    // get product details from request

    // using destructering
    const {id,title,price,image}=req.body
   console.log(id);


 // logic
 try{
    // check product is in wishlist
    const item =await wishlists.findOne({id})
    if(item){
        res.status(402).json("item already present in your wishlist")
    }else{
        // add items to wishlist collection
        const newProduct=new wishlists({
            id,title,price,image
        })
        // to store db
        await newProduct.save()
        res.status(200).json("item added to your wishlist")
    }

 }
 catch(err){
    res.status(401).json(err)

 }

}

// get wishlist
exports.getwishlistItems=async(req,res)=>{
        // logic

 try{ 
    // get all wishlist from wishlist collection in mongodb
   const allProducts=await wishlists.find()
   res.status(200).json(allProducts)

   }
   catch(error){
       res.status(401).json(error)

   }
}

// remove wishlist item
exports.removefromwishlist=async (req,res)=>{
    // get id from req
    const {id} =req.params

    // remove id from wishlist collection
    try{
        const removeItem=await wishlists.deleteOne({id})
        if(removeItem){
            // get all wishlist item after removing the particular item
            const allItems=await wishlists.find()
            res.status(200).json(allItems)

        }
        else{
            res.status(404).json("items not present in your wishlist")

        }

    }
    catch(error){
        res.status(401).json(error)


    }
}
