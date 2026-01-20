import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
      index: true,
    },

    hospitalName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    contactEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    contactPhone: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], 
        required: true,
      },
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

hospitalSchema.index({ location: "2dsphere" });

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
