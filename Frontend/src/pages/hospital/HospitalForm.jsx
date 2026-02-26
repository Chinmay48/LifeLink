import { useState } from "react";
import { motion } from "framer-motion";
import { updateHospitalProfile } from "../../features/hospital/hospitalAPI";
import useAppContext from "../../hooks/useAppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Building2, FileBadge, Mail, Phone, Bed, MapPin, ArrowRight } from "lucide-react";

const HospitalForm = () => {
  const navigate = useNavigate();
  const { updateUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ hospitalName: "", licenseNumber: "", contactEmail: "", contactPhone: "", address: "", capacity: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, location: { type: "Point", coordinates: [72.8777, 19.0760] } };
      const res = await updateHospitalProfile(payload);
      toast.success(res.message || "Hospital profile verified!");
      updateUser({ profileCompleted: true });
      navigate("/hospital/dashboard");
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };

  const inputStyles = "w-full pl-10 pr-4 py-3 bg-orange-50/30 border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all";
  const iconStyles = "absolute left-3 top-3.5 h-5 w-5 text-orange-400";

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative md:col-span-2"><Building2 className={iconStyles} /><input name="hospitalName" placeholder="Hospital Name" onChange={handleChange} required className={inputStyles} /></div>
        <div className="relative"><FileBadge className={iconStyles} /><input name="licenseNumber" placeholder="License Number" onChange={handleChange} required className={inputStyles} /></div>
        <div className="relative"><Bed className={iconStyles} /><input name="capacity" type="number" placeholder="Total Bed Capacity" onChange={handleChange} required className={inputStyles} /></div>
        <div className="relative"><Mail className={iconStyles} /><input name="contactEmail" type="email" placeholder="Contact Email" onChange={handleChange} required className={inputStyles} /></div>
        <div className="relative"><Phone className={iconStyles} /><input name="contactPhone" type="tel" placeholder="Contact Phone" onChange={handleChange} required className={inputStyles} /></div>
        <div className="relative md:col-span-2"><MapPin className={iconStyles} /><textarea name="address" placeholder="Physical Address" onChange={handleChange} required className={`${inputStyles} h-20 pt-3 resize-none`} /></div>
      </div>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 group"
      >
        {loading ? "Verifying..." : "Verify Hospital Profile"} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.form>
  );
};

export default HospitalForm;