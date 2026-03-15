import mongoose from "mongoose";
import { ORGAN_TYPES } from "../constants/Organ.js";
const organSchema= new mongoose.Schema({
    
    organType:{type:String,required:true,enum:ORGAN_TYPES,index:true},
    donorId:{type:mongoose.Schema.Types.ObjectId,ref:"Donor",required:true,index:true},
    subType:{type:mongoose.Schema.Types.Mixed,required:true},
     isSingleUse: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

},{timestamps:true})


const Organ=mongoose.model('Organ',organSchema);
export default Organ;
