import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true,index:true,lowercase:true,trim:true},
    password:{type:String,required:true},
    role:{type:String,enum:["DONOR", "HOSPITAL_ADMIN", "SYSTEM_ADMIN"],required:true},
    isActive:{type:Boolean,required:true,default:true},
    isVerified:{type:Boolean,required:true,default:true},
    lastLoginAt:{type:Date,default:null},
    
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
export default User;