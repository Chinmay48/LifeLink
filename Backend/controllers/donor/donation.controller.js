import Donation from "../../models/Donation.js";
import Donor from "../../models/Donor.js";
import Organ from "../../models/Organ.js";
import mongoose from "mongoose";
export const createDonation = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;

    const donor = await Donor.findOne({ userId }).session(session);

    if (!donor) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Donor profile not found",
      });
    }

    if (!donor.isAvailable) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Donor is currently not available",
      });
    }

    const { organType, subType, expiryTime } = req.body;

    if (!organType || !subType || !expiryTime) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Incomplete donation details",
      });
    }

    const expiryDate = new Date(expiryTime);

    if (expiryDate <= new Date()) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Expiry time must be in the future",
      });
    }

    if(organType==="BLOOD"){
      const lastBloodOrgan = await Organ.findOne({
  donorId: donor._id,
  organType: "BLOOD",
})
.sort({ createdAt: -1 })
.session(session);

if (lastBloodOrgan) {
  const lastBloodDonation = await Donation.findOne({
    organId: lastBloodOrgan._id,
  }).session(session);

  if (lastBloodDonation) {
    const lastDate = new Date(lastBloodDonation.createdAt);
    const now = new Date();

    const diffInDays = (now - lastDate) / (1000 * 60 * 60 * 24);

    if (diffInDays < 90) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message:
          "You can donate blood only after 3 months from last donation",
      });
    }
  }
}

    }
    else{
      const existingOrgan=await Organ.findOne({
        donorId:donor._id,
        organType,
        isActive:true,
      }).session(session)
      if(existingOrgan){
        await session.abortTransaction()
        return res.status(400).json({
          success:false,message:`You have already registered a ${organType} donation`
        })
      }
    }

    const organ = await Organ.create(
      [
        {
          donorId: donor._id,
          organType,
          subType,
        },
      ],
      { session },
    );

    const donation = await Donation.create(
      [
        {
          donorId: donor._id,
          organId: organ[0]._id,
          expiryTime: expiryDate,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    const populatedDonation = await Donation.findById(donation[0]._id)
      .populate("organId")
      .populate("donorId");

    return res.status(201).json({
      success: true,
      message: "Donation created successfully",
      donation: populatedDonation,
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};

export const getMyDonations = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) {
      return res
        .status(404)
        .json({ success: false, message: "Donor not found" });
    }
    const donations = await Donation.find({ donorId: donor._id })
      .populate("organId")
      .populate("assignedHospital", "hospitalName");
    return res.status(200).json({ success: true, data: donations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
