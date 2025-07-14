import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const Userschema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true
        },

        password:{
            type:String,
            required:true,
            unique:true
        },

        usertype:{
            type:String,
            required:true
        },
        
        mobileNo:{
            type:String,
            unique:true,
            required:true
        },
        verified:{
            type:Boolean,
            default:false

        },
        islogin:{
            type:Boolean,
            default:false
        },
        refreshToken:{
            type:String,
            trim:true
        }


    },
    {
        timestamps:true
    }

)

Userschema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password , 10);
    next();


  

})



Userschema.methods.isPasswordcorrect=async function(password) {
    return await bcrypt.compare(password , this.password)

    
}

// Userschema.methods.generateAccessToken=async function(){
//     jwt.sign(
//         {
//             id:this._id
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:"2d"

//         }

//     )

// }

Userschema.methods.generateRefreshToken=async function(){
    jwt.sign(
        {
            id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:"10d"

        }

    )

}
export const Usermodel=mongoose.model("User",Userschema);