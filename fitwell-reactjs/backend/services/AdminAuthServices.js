const Admin=require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
class AdminAuthServices{
    async adminLogin(reqData){
        try{
            var email=reqData.email;
            var password=reqData.password;
            let success=false;
            let admin=await Admin.findOne({email:email});
            if(!admin){
                return {error: true, msg:'Email ID already Registered', data:{}};
            }
            const comparePassword=await bcrypt.compare(password, admin.password);
            if(!comparePassword){
                return {error:true, msg:'Invalid Credentials', data:{}};
            }
            const data={
                admin:{  
                    id:admin.id,
                }
            }
            var authtoken=await jwt.sign(data, process.env.JWT_SECRET);
            if(authtoken){
                success=true;
            }
            const adminDetails={
                name:admin.name,
                email:admin.email,
            }
            // req.cookies.adminDetails=adminDetails;
            return {error:false, msg:'Admin LoggedIn Successfully!', data:adminDetails};
        }
        catch(err){
          return {error: true, msg:err.message, data:{}};
        }
    }

    async createAdmin(reqData){
        try{
            let prevadmin=await Admin.findOne({email:reqData.email})
            if(prevadmin){
                return {error:true, msg:'EmailID Already registered'}
            }
            const pass=reqData.password;
            const salt=await bcrypt.genSaltSync(10);
            const secpass=await bcrypt.hashSync(pass, salt);
            let admin=await Admin.create({
                name:reqData.name,
                email:reqData.email,
                password:secpass,
            })
            const data={
                admin:{
                    id:admin.id,
                }
            }
            var authtoken=jwt.sign(data, process.env.JWT_SECRET);

            return {error:false, msg:'Admin Created Successfully', data:admin}
        }
        catch(err){
            return {error:true, msg:err.message};
        }
    }
}
module.exports= new AdminAuthServices();