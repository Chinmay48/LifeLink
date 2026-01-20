import mongoose from "mongoose";

const donationSchema= new mongoose.Schema({
    donorId:{type:mongoose.Schema.Types.ObjectId,ref:'Donor',required:true,index:true},
    organId:{type:mongoose.Schema.Types.ObjectId,ref:'Organ',required:true,index:true,unique:true},
    status:{type:String,enum:["AVAILABLE", "RESERVED", "TRANSPLANTED", "EXPIRED"],default:"AVAILABLE",index:true},
    assignedHospital:{type:mongoose.Schema.Types.ObjectId,default:null,index:true,ref:"Hospital"},
      matchedRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TransplantRequest",
      default: null,
      index: true,
    },
    expiryTime:{type:Date,required:true,index:true}
},{
    timestamps:true
})

const Donation=mongoose.model('Donation',donationSchema);
export default Donation;