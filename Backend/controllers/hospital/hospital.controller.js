import Hospital from "../../models/Hospital.js";
import User from "../../models/User.js";

export const upsertHospitalProfile=async(req,res)=>{
  try {
      const userId=req.user.id;
      const hospitalData={
        userId,...req.body
      }

      const hospital=await Hospital.findOneAndUpdate({userId},hospitalData,{new:true,upsert:true,runValidators:true});
      await User.findByIdAndUpdate(userId,{profileCompleted:true})
      return res.status(200).json({success:true,message:"Hospital Details saved successfully",data:hospital})
  } catch (error) {
       return res.status(500).json({success:false,message:error.message})
  }
}


export const getHospitalProfile=async(req,res)=>{
    try {
        const hospital=await Hospital.findOne({userId:req.user.id})
        if(!hospital) return res.status(404).json({success:false,message:"Hospital details not found"});
        return res.status(200).json({success:true,data:hospital});
    } catch (error) {
         return res.status(500).json({success:false,message:error.message});
    }
}