import mongoose from "mongoose";

const organBankSchema = new mongoose.Schema(
  {
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

    availableCount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    storedOrgans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organ",
      },
    ],
  },
  {
    timestamps: true,
  }
);


organBankSchema.index(
  { hospitalId: 1, organType: 1 },
  { unique: true }
);

const OrganBank = mongoose.model("OrganBank", organBankSchema);
export default OrganBank;
