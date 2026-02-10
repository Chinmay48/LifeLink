import Donor from "../../models/Donor.js";
import User from "../../models/User.js";

export const upsertProfile=async(req,res)=>{
    try {
        const userId=req.user.id;
        const donorData={
            ...req.body,userId
        }

        const donor=await Donor.findOneAndUpdate({userId},donorData,{new:true,upsert:true,runValidators:true})
        await User.findByIdAndUpdate(userId,{profileCompleted:true})
        return res.status(200).json({success:true,message:"Donor created successfully",data:donor},)
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}

export const getProfile=async(req,res)=>{
    try {
        const donor=await Donor.findOne({userId:req.user.id})
        if(!donor){
            return res.status(404).json({success:false,message:"Donor not found"})
        }

        return res.status(200).json({success:true,data:donor})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const updateAvailability=async(req,res)=>{
    try {
        const {isAvailable}=req.body;
        if(typeof isAvailable !== "boolean"){
            return res.status(400).json({success:false,message:"IsAvailable must be boolean"})
        }
        const donor=await Donor.findOneAndUpdate({userId:req.user.id},{isAvailable},{new:true})

        if(!donor){
            return res.status(404).json({success:false,message:"Donor not found"})
        }

        return res.status(200).json({success:true,message:"Availability Updated successfully",data:{isAvailable:donor.isAvailable}})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}