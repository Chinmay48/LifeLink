import mongoose from "mongoose";

const transplantRequestSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      index: true,
    },

    organType: {
      type: String,
      enum: ["BLOOD", "KIDNEY", "HEART", "LIVER", "SKIN"],
      required: true,
      index: true,
    },

    requiredSubType: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    urgencyLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "MATCHED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },

    matchedDonationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      default: null,
      index: true,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


transplantRequestSchema.index(
  { patientId: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["PENDING", "MATCHED"] },
    },
  }
);

const TransplantRequest = mongoose.model(
  "TransplantRequest",
  transplantRequestSchema
);

export default TransplantRequest;
