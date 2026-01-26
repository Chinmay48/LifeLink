import Donation from "../../models/Donation.js";
import Hospital from "../../models/Hospital.js";
import OrganBank from "../../models/OrganBank.js";
import Patient from "../../models/Patient.js";
import TransplantRequest from "../../models/TransplantRequest.js";

export const createTransplantRequest = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ userId: req.user.id });
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    const { patientId, organType, requiredSubType, urgencyLevel } = req.body;
    if (!patientId || !organType || !requiredSubType || !urgencyLevel) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required details" });
    }

    const patient = await Patient.findOne({
      _id: patientId,
      hospitalId: hospital._id,
    });

    if (!patient) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Patient for this hospital" });
    }

    const inventory = await OrganBank.findOne({
      hospitalId: hospital._id,
      organType,
    });
    if (inventory || inventory.availableCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Organ available in hospital inventory, transplant request not required",
      });
    }

    const request = await TransplantRequest.create({
      patientId,
      hospitalId: hospital._id,
      organType,
      requiredSubType,
      urgencyLevel,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Transplant request created successfully",
        data: request,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const matchDonationToRequest = async (req, res) => {
  try {
    const hospital = await Hospital({ userId: req.user.id });
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    const { donationId } = req.body;
    if (!donationId) {
      return res
        .status(400)
        .json({ success: false, message: "Donation Id is required" });
    }

    const request = await TransplantRequest.findOne({
      _id: req.params.id,
      hospitalId: hospital._id,
      status: "PENDING",
    });
    if (!request) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Valid transplant request not found",
        });
    }

    const donation = await Donation.findOne({
      _id: donationId,
      status: "AVAILABLE",
      expiryTime:{$gt:new Date()},
    });
    if (!donation) {
      return res
        .status(400)
        .json({ success: false, message: "Donation is not available" });
    }

    donation.status = "RESERVED";
    donation.assignedHospital = hospital._id;
    donation.matchedRequestId = request._id;
    await donation.save();

    request.status = "MATCHED";
    request.matchedDonationId = donation._id;
    await request.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Donation matched to request",
        data: request,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const completeTransplant = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ userId: req.user.id });
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }
    const request = await TransplantRequest.findOne({
      _id: req.params.id,
      hospitalId: hospital._id,
      status: "MATCHED",
    });

    if (!request) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Mathched transplant request not found",
        });
    }
    const donation = await Donation.findById(request.matchedDonationId);
    if (!donation) {
      return res.status(500).json({
        success: false,
        message: "Matched donation missing",
      });
    }

    donation.status="TRANSPLANTED"
    await donation.save()

    request.status="COMPLETED"
    request.completedAt=new Date()
    await request.save()

    return res.status(200).json({success:true,message:"Transplant completed successfully"})


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
