import Hospital from "../../models/Hospital.js";
import OrganBank from "../../models/OrganBank.js";

export const getOrganInventory = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ userId: req.user.id });
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }
    const inventory = await OrganBank.find({ hospitalId: hospital._id }).sort({
      organType: 1,
    });

    return res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrganStock = async (req, res) => {
  try {
    const { organType } = req.params;
    const { delta } = req.body;
    if (typeof delta !== "number") {
      return res
        .status(400)
        .json({ success: false, message: "Delta must be a number" });
    }
    const hospital = await Hospital.findOne({ userId: req.user.id });
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    const organBank = await OrganBank.findOneAndUpdate(
      {
        hospitalId: hospital._id,
        organType: organType,
      },
      { $inc: { availableCount: delta } },
      { new: true, upsert: true, runValidators: true },
    );

    if (organBank.availableCount < 0) {
      organBank.availableCount = 0;
      await organBank.save();
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Stocks updated successfully",
        data: organBank,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
