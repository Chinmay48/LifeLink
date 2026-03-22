import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  Phone,
  HeartPulse,
  Droplet,
  MapPin,
  AlertTriangle,
  FileText,
  Users,
  Calendar,
  ChevronRight,
  PlusCircle
} from "lucide-react";
import { createPatient } from "../../../features/hospital/hospitalAPI";
import { showError, showSuccess } from "../../../utils/toast";
import LocationPicker from "../../../components/maps/LocationPicker";

const CreatePatient = () => {
  const initialState = {
  fullName: "",
  gender: "",
  age: "",
  phone: "",
  bloodGroup: "",
  requiredOrganType: "",
  urgencyLevel: "",
  medicalNotes: "",
  address: "",
  location: null,
};
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    phone: "",
    bloodGroup: "",
    requiredOrganType: "",
    urgencyLevel: "",
    medicalNotes: "",
    address: "",
    location: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createPatient(formData);
      showSuccess(res.message);
      setFormData(initialState)
    } catch (error) {
      showError(error.message);
    }
    
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const inputClass = "w-full p-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-700 appearance-none";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-orange-500";

  return (
    <div className="min-h-screen bg-orange-50/30 py-10 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-orange-100 overflow-hidden border border-orange-100"
      >
        {/* Header Section */}
        <div className="bg-orange-600 p-8 text-white text-center relative overflow-hidden">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10"
          >
            <PlusCircle className="mx-auto mb-3" size={48} />
            <h2 className="text-3xl font-extrabold tracking-tight">Add New Patient</h2>
            <p className="text-orange-100 mt-2">Enter the clinical details for the transplant registry</p>
          </motion.div>
          {/* Decorative Circles */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-orange-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-orange-700 rounded-full opacity-20 blur-3xl" />
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <motion.div variants={itemVariants} className="relative group">
              <User className={iconClass} size={20} />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className={inputClass}
                required
              />
            </motion.div>

            {/* Gender */}
            <motion.div variants={itemVariants} className="relative">
              <Users className={iconClass} size={20} />
              <select name="gender" onChange={handleChange} className={inputClass} required>
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
            </motion.div>

            {/* Age */}
            <motion.div variants={itemVariants} className="relative">
              <Calendar className={iconClass} size={20} />
              <input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleChange}
                className={inputClass}
                required
              />
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants} className="relative">
              <Phone className={iconClass} size={20} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className={inputClass}
                required
              />
            </motion.div>

            {/* Blood Group */}
            <motion.div variants={itemVariants} className="relative">
              <Droplet className={iconClass} size={20} />
              <select name="bloodGroup" onChange={handleChange} className={inputClass} required>
                <option value="">Blood Group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </motion.div>

            {/* Organ Required */}
            <motion.div variants={itemVariants} className="relative">
              <HeartPulse className={iconClass} size={20} />
              <select name="requiredOrganType" onChange={handleChange} className={inputClass} required>
                <option value="">Organ Required</option>
                {["BLOOD", "KIDNEY", "HEART", "LIVER", "SKIN"].map((organ) => (
                  <option key={organ} value={organ}>{organ}</option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Urgency Level - Full Width */}
          <motion.div variants={itemVariants} className="relative">
            <AlertTriangle className={iconClass} size={20} />
            <select name="urgencyLevel" onChange={handleChange} className={inputClass} required>
              <option value="">Urgency Level</option>
              <option value="LOW" className="text-blue-500 font-bold">Low Priority</option>
              <option value="MEDIUM" className="text-yellow-500 font-bold">Medium Priority</option>
              <option value="HIGH" className="text-orange-500 font-bold">High Priority</option>
              <option value="CRITICAL" className="text-red-600 font-bold">Critical (Immediate)</option>
            </select>
          </motion.div>

          {/* Medical Notes */}
          <motion.div variants={itemVariants} className="relative">
            <FileText className="absolute left-3 top-3 text-orange-500" size={20} />
            <textarea
              name="medicalNotes"
              placeholder="Medical History & Clinical Notes..."
              rows="3"
              onChange={handleChange}
              className={`${inputClass} pl-11 pt-3 resize-none`}
            />
          </motion.div>

          {/* Address */}
          <motion.div variants={itemVariants} className="relative">
            <MapPin className={iconClass} size={20} />
            <input
              type="text"
              name="address"
              value={formData.address}
              readOnly
              placeholder="Address (Auto-picked from map)"
              className={`${inputClass} bg-orange-50/50 cursor-not-allowed`}
            />
          </motion.div>

          {/* Location Picker */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl overflow-hidden border-2 border-orange-100 shadow-inner"
          >
            <LocationPicker
              setCoordinates={(coords) => setFormData((p) => ({ ...p, location: coords }))}
              setAddress={(addr) => setFormData((p) => ({ ...p, address: addr }))}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#ea580c" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all"
          >
            Register Patient
            <ChevronRight size={20} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePatient;