import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    LastName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        // using jwt(jsonwebtoken) library to generate tokens use jwt.io
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    // in above each time password was changing so instead of that we just changed only if it got modified
    this.password= await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
         firstName:this.firstName,
         LastName:this.LastName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
          
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User = mongoose.model("User",userSchema);