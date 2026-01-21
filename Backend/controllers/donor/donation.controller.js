import Donation from "../../models/Donation.js";
import Donor from "../../models/Donor.js"
import Organ from "../../models/Organ.js";


export const createDonation=async(req,res)=>{
    try {
        const donor=await Donor.findOne({userId:req.user.id});
        if(!donor){
            return res.status(404).json({success:false,message:"Donor not found"})
        }

        if(!donor.isAvailable){
            return res.status(400).json({success:false,message:"Donor is not available"})
        }

        const {organType,subType,expiryTime}=req.body;
        if(!organType || !subType || !expiryTime){
            return res.status(400).json({success:false,message:"Incomplete details"})
        }

        const organ=await Organ.create({
            donorId:donor._id,
            organType,subType
        })

        const donation = await Donation.create({
            donorId:donor._id,
            organId:organ._id,
            expiryTime
        })

        return res.status(200).json({success:true,message:"Donation created successfully",data:donation})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}


export const getMyDonations=async(req,res)=>{
    try {
        const donor=await Donor.findOne({userId:req.user.id});
        if(!donor){
            return res.status(404).json({success:false,message:"Donor not found"})
        }
        const donations=await Donation.find({donorId:donor._id}).populate("organId").populate("assignedHospital","hospitalName");
        return res.status(200).json({success:true,data:donations});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}