import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  fullName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ["MALE", "FEMALE", "OTHERS"], required: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  phone: { type: String, required: true, unique: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    index: true,
    required: true,
  },
  consentType: { type: String, enum: ["LIVE", "AFTER_DEATH"], required: true },
  medicalClearance: { type: Boolean, required: true, default: false },
  isAvailable: { type: Boolean, required: true, index: true, default: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
},{
    timestamps: true,
});

donorSchema.index({location:"2dsphere"})

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
