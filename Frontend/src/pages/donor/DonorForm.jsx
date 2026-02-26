import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAppContext from "../../hooks/useAppContext";
import { motion } from "framer-motion";
import { updateDonorProfile } from "../../features/donor/donorAPI";
import { 
  User, 
  Calendar, 
  Users, 
  Phone, 
  Droplets, 
  ClipboardCheck, 
  MapPin, 
  ArrowRight
} from "lucide-react";

const DonorForm = () => {
  const navigate = useNavigate();
  const { updateUser } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    bloodGroup: "",
    consentType: "",
    medicalClearance: false,
    address: "",
  });

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        location: {
          type: "Point",
          coordinates: [72.8777, 19.0760],
        },
      };

      const res = await updateDonorProfile(payload);
      toast.success(res.message || "Profile updated successfully!");
      updateUser({ profileCompleted: true });
      navigate("/donor/dashboard");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🟠 Orange themed input styles
  const inputStyles =
    "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200";

  // 🎨 Slightly warm icon color (matches orange theme better)
  const iconStyles =
    "absolute left-3 top-3.5 h-5 w-5 text-gray-500";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div className="relative">
          <User className={iconStyles} />
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className={inputStyles}
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className={iconStyles} />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className={inputStyles}
          />
        </div>

        {/* Age */}
        <div className="relative">
          <Calendar className={iconStyles} />
          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            required
            className={inputStyles}
          />
        </div>

        {/* Gender */}
        <div className="relative">
          <Users className={iconStyles} />
          <select name="gender" onChange={handleChange} required className={inputStyles}>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="relative">
          <Droplets className={iconStyles} />
          <select name="bloodGroup" onChange={handleChange} required className={inputStyles}>
            <option value="">Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        {/* Consent Type */}
        <div className="relative">
          <ClipboardCheck className={iconStyles} />
          <select name="consentType" onChange={handleChange} required className={inputStyles}>
            <option value="">Consent Type</option>
            <option value="LIVE">Live Donation</option>
            <option value="AFTER_DEATH">After Death</option>
          </select>
        </div>

        {/* Address */}
        <div className="relative md:col-span-2">
          <MapPin className={iconStyles} />
          <input
            name="address"
            placeholder="Residential Address"
            onChange={handleChange}
            required
            className={inputStyles}
          />
        </div>
      </div>

      {/* Medical Clearance (kept green for UX clarity) */}
      <div
        className={`p-4 rounded-xl border-2 transition-all ${
          formData.medicalClearance
            ? "border-green-500 bg-green-50"
            : "border-gray-100 bg-gray-50"
        }`}
      >
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="medicalClearance"
            onChange={handleChange}
            className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
          />
          <span
            className={`text-sm font-medium ${
              formData.medicalClearance
                ? "text-green-700"
                : "text-gray-600"
            }`}
          >
            I confirm that I have received medical clearance for donation.
          </span>
        </label>
      </div>

      {/* Submit Button (Orange Theme 🔥) */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 group"
      >
        {loading ? "Processing..." : "Complete Registration"}
        {!loading && (
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        )}
      </motion.button>
    </motion.form>
  );
};

export default DonorForm;