import Hospital from "../../models/Hospital.js"
import Patient from "../../models/Patient.js"


export const createPatient=async(req,res)=>{
   try {
    const hospital=await Hospital.findOne({userId:req.user.id})
    if(!hospital){
        return res.status(404).json({success:false,message:"Hospital not found"})
    }
    const patientData={
        hospitalId:hospital._id,
        ...req.body
    }
    const patient=await Patient.create(patientData);
    return res.status(200).json({success:true,message:"Patient details save successfully",data:patient})
   } catch (error) {
       return res.status(500).json({success:false,message:error.message});
   }
}

export const getPatients = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ userId: req.user.id });

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const patients = await Patient.find({ hospitalId: hospital._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};