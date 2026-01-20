import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHERS"],
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    phone: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: true,
      index: true,
    },

    requiredOrganType: {
      type: String,
      enum: ["BLOOD", "KIDNEY", "HEART", "LIVER", "SKIN"],
      required: true,
      index: true,
    },

    urgencyLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      required: true,
      index: true,
    },

    medicalNotes: {
      type: String,
      default: "",
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

    status: {
      type: String,
      enum: ["ACTIVE", "TRANSPLANTED", "CANCELLED"],
      default: "ACTIVE",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);


patientSchema.index({ location: "2dsphere" });

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
