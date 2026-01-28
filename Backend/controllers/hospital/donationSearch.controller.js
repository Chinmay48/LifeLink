import Donation from "../../models/Donation.js";
import Organ from "../../models/Organ.js";

export const searchAvailableDonations = async (req, res) => {
  try {
    const {
      organType,
      bloodGroup,
      lat,
      lng,
      radius = 50, // km
    } = req.query;

    if (!organType || !lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "organType, lat and lng are required",
      });
    }

    const now = new Date();

    const donations = await Donation.aggregate([
      {
        $match: {
          status: "AVAILABLE",
          expiryTime: { $gt: now },
        },
      },
      {
        $lookup: {
          from: "organs",
          localField: "organId",
          foreignField: "_id",
          as: "organ",
        },
      },
      { $unwind: "$organ" },
      {
        $match: {
          "organ.organType": organType,
          ...(bloodGroup && { "organ.subType.group": bloodGroup }),
        },
      },
      {
        $lookup: {
          from: "donors",
          localField: "donorId",
          foreignField: "_id",
          as: "donor",
        },
      },
      { $unwind: "$donor" },
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          distanceField: "distance",
          maxDistance: parseFloat(radius) * 1000,
          spherical: true,
          key: "donor.location",
        },
      },
      {
        $project: {
          status: 1,
          expiryTime: 1,
          distance: 1,
          organ: 1,
          donor: {
            fullName: 1,
            bloodGroup: 1,
            address: 1,
          },
        },
      },
      { $sort: { distance: 1 } },
    ]);

    return res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};