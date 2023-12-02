const ContactUs=require('../models/contactform')
const PaymentSchema=require('../models/payments')
const UserSchema=require('../models/User')
class UserActionServices{

    //submitting contact form :User login NOT required
    async contactUs(reqData){
        try{
            const name=reqData.name;
            const email=reqData.email;
            const phone=reqData.phone;
            const subject=reqData.subject;
            const message=reqData.message;
            // const date=req.body.name; 
            const data=await ContactUs.create({
                name:name,
                email:email, 
                phone:phone,
                subject:subject,
                message:message, 
            })
             
            if(!data){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Form Submitted Successfully', data:data}
            
        }
        catch(err){
           return {error:true, msg:err.message}
        }
    }

    //Submitting review. User Login required
    async putReview(req){
        try{
            const comment=req.body.comment;
            const userDetails = req.session.userDetails;
            if(!userDetails){
               return {error:true, msg:'Please Login again. Session Expired.'}
            }

            let review=await ReviewSchema.create({
                user:userDetails.id,
                comment:comment,
                image:userDetails.image,
                name:userDetails.name,
            })

            if(!review){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Review Submitted Successfully', data:review};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }

    //Product add to card: User Login required
    async addToCart(req){
        try{
            if(!req.session.userDetails){
                return {error:true, msg:'Please Login again. Session Expired.'}
            }
            const productid=req.body.productid;
            let product=await CartSchema.create({
                user:req.session.userDetails.id,
                productid:productid
            })
    
           if(!product){
            return {error:true, msg:'Internal Server Error'};
           }

           return {error:false, msg:'Added to Cart Successfully!', data:product};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }
       
    //Checkouting User Cart: User Login required
    async checkoutcart(req){
        try{
            const userDetails=req.session.userDetails;
            const userid=userDetails.id; 
            CartSchema.deleteMany({user:userid})

            //Here this products should enter into order schema.
            const address=req.body.address;
            const finalamount=req.body.finalamount;
            const products=req.session.products;
            products.forEach(async(item) => {
                OrderSchema.create({ 
                   user:userid,
                   name:item[0].name,
                   image:item[0].img,
                   amount:finalamount,
                   description:item[0].description,
                   address:address
               })
            });
            
            const newPayment=await PaymentSchema.create({
                user:userid,
                amount:finalamount,
            });

            return {error:false, msg:'Cart Checkout Successfully', data:newPayment};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }


    //Update Profile Updation: User Login Required
    async updateProfile(req){
        try{
            const userDetails=req.session.userDetails;
            const id=userDetails.id;
            const name=req.body.name;
            const age=req.body.age;
            const weight=req.body.weight;
            const height=req.body.height;
            const image=req.body.image;

            if(!req.session.userDetails){
                return {error:true, msg:'Session Expired. Please Login again.'}
            }

            const user=await UserSchema.findById(id);
            if(!user){
                return {error:true, msg:'User Not Exist'};
            }

            const updated=await UserSchema.findByIdAndUpdate(id, {
                name:name, 
                age:age, 
                weight:weight,
                height:height,
                image:image
            })

            if(!updated){
                return {error:true, msg:'Internal Server Error'}
            }

            return {error:false, msg:'User Updated Successfully', data:updated};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }
}

module.exports=new UserActionServices();