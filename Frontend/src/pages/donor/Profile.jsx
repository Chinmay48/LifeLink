import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Calendar,
  Droplets,
  MapPin,
  ShieldCheck,
  Edit3,
  Save,
  X,
  ChevronRight,
  Heart,
  Loader2,
  Droplet,
} from "lucide-react";

import { showSuccess, showError } from "../../utils/toast";
import {
  getDonorProfile,
  updateDonorProfile,
} from "../../features/donor/donorAPI";
import LocationPicker from "../../components/maps/LocationPicker";

const DonorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getDonorProfile();
      setProfile(res.data);
      if (res.data.location) {
        setLocation(res.data.location);
      }
      
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      // Constructing payload without the 'loading' boolean
      const payload = {
        ...profile,
        location: location, // Ensure the map coordinates are sent
      };

      const res = await updateDonorProfile(payload);
      showSuccess(res.message || "Profile updated successfully");
      setEditMode(false);
      fetchProfile();
    } catch (error) {
      showError(error.message);
    } finally {
      setSaveLoading(false);
    }
  };
  const setAddressFromMap = (address) => {
    setProfile((prev) => ({
      ...prev,
      address,
    }));
  };

  const underScoreRemove = (slug = "") => {
    return slug
      .split("_")
      .map((word) => word[0] + word.slice(1, word.length).toLowerCase())
      .join(" ");
  };

  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50/50">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart size={48} className="text-orange-500" fill="currentColor" />
        </motion.div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-orange-50/50 p-4 md:p-8 flex justify-center items-start">
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-orange-200/40 overflow-hidden border border-orange-100"
      >
        {/* HEADER SECTION */}
        <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 p-8 md:p-12 text-white">
          <div className="absolute top-0 md:right-60 right-0 p-8 opacity-10 pointer-events-none">
            <Heart size={160} fill="currentColor" />
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white/20 backdrop-blur-md p-3 rounded-2xl inline-block mb-4"
              >
                <User size={32} />
              </motion.div>
              <h1 className="text-4xl font-black tracking-tight">
                Donor Profile
              </h1>
              <p className="text-orange-50 opacity-90 text-lg">
                Your contribution saves lives.
              </p>
            </div>

            <div className="flex gap-3">
              <AnimatePresence mode="wait">
                {!editMode ? (
                  <motion.button
                    key="edit-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-orange-50 transition-all"
                  >
                    <Edit3 size={20} />
                    Edit Profile
                  </motion.button>
                ) : (
                  <motion.div
                    key="edit-actions"
                    className="flex gap-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <button
                      disabled={saveLoading}
                      onClick={() => setEditMode(false)}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/40 px-6 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all disabled:opacity-50"
                    >
                      <X size={20} />
                      Cancel
                    </button>
                    <button
                      disabled={saveLoading}
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-orange-50 transition-all disabled:opacity-80"
                    >
                      {saveLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Save size={20} />
                      )}
                      {saveLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* MAIN FORM AREA */}
            <div className="lg:col-span-8 space-y-10">
              <section>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 mb-8 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-orange-200"></div>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProfileField
                    label="Full Name"
                    icon={<User />}
                    name="fullName"
                    value={profile.fullName}
                    editMode={editMode}
                    onChange={handleChange}
                  />
                  <ProfileField
                    label="Phone Number"
                    icon={<Phone />}
                    name="phone"
                    value={profile.phone}
                    editMode={editMode}
                    onChange={handleChange}
                  />
                  <ProfileField
                    label="Age"
                    icon={<Calendar />}
                    name="age"
                    value={profile.age}
                    editMode={editMode}
                    onChange={handleChange}
                  />
                  <ProfileField
                    label="Blood Group"
                    icon={<Droplet />}
                    name="bloodGroup"
                    value={profile.bloodGroup}
                    editMode={editMode}
                    onChange={handleChange}
                  />
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 ml-1 uppercase">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        value={profile.gender || "MALE"}
                        disabled={!editMode}
                        onChange={handleChange}
                        className={`w-full pl-5 pr-12 py-4 rounded-2xl border-2 transition-all appearance-none font-medium ${
                          editMode
                            ? "border-orange-100 focus:border-orange-500 bg-orange-50/30"
                            : "border-transparent bg-gray-50 text-gray-700"
                        }`}
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHERS">Others</option>
                      </select>
                      <ChevronRight
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-300 pointer-events-none rotate-90"
                        size={18}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 mb-8 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-orange-200"></div>
                  Location Details
                </h3>
                <div className="space-y-6">
                  <ProfileField
                    label="Registered Address"
                    icon={<MapPin />}
                    name="address"
                    value={profile.address}
                    editMode={editMode}
                    onChange={handleChange}
                    fullWidth
                  />

                  <AnimatePresence>
                    {editMode && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-1 bg-orange-100/50 rounded-[2rem] border-2 border-dashed border-orange-200"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-orange-700 font-bold mb-4 text-sm">
                            <MapPin size={18} className="text-orange-500" />
                            Drag the pin to update your precise location
                          </div>
                          <div className="rounded-2xl overflow-hidden shadow-inner bg-white min-h-[300px]">
                            <LocationPicker
                              setCoordinates={setLocation}
                              initialLocation={location}
                              setAddress={setAddressFromMap}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            </div>

            {/* SIDEBAR STATUS */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-orange-50/50 rounded-[2.5rem] p-8 border border-orange-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-8">
                  Medical Profile
                </h3>

                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-orange-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">
                        Blood Type
                      </span>
                      <div className="text-3xl font-black text-orange-600">
                        {profile.bloodGroup || "N/A"}
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-2xl text-red-500">
                      <Droplets size={28} fill="currentColor" />
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                    <div className="flex items-center gap-3 mb-3 text-green-600">
                      <ShieldCheck size={20} />
                      <span className="text-[10px] font-black uppercase text-gray-400">
                        Consent Status
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-800 leading-tight">
                      {underScoreRemove(profile.consentType) ||
                        "Standard Donor"}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-4 leading-relaxed bg-gray-50 p-3 rounded-xl italic">
                      Medical status can only be updated by verified health
                      officers.
                    </p>
                  </div>
                </div>
              </div>

              {/* DYNAMIC VIRTUAL ID CARD */}
              <div className="p-8 bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-[2.5rem] text-orange-950 shadow-xl shadow-orange-200/50 relative overflow-hidden group border border-white">
                {/* Abstract light glow effects */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200/30 blur-3xl group-hover:bg-orange-300/40 transition-all duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-100/40 blur-3xl transition-all"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="p-3 bg-orange-500 rounded-2xl shadow-lg shadow-orange-200">
                      <Heart
                        size={28}
                        className="text-white"
                        fill="currentColor"
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-1">
                        Donor Pass
                      </div>
                      <div className="inline-block px-3 py-1 bg-orange-100/50 rounded-full text-[10px] font-mono text-orange-600 font-bold border border-orange-200/50">
                        ID:{" "}
                        {profile?._id?.slice(-8).toUpperCase() || "NEW-USER"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-bold text-orange-400/80 uppercase tracking-widest">
                      Official Member
                    </div>
                    <div className="text-xl font-black tracking-tight text-gray-900 drop-shadow-sm truncate">
                      {profile.fullName || "Donor Name"}
                    </div>

                    {/* Bottom decorative bar */}
                    <div className="flex items-center gap-2 mt-4">
                      <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
                      <div className="h-1 w-4 bg-orange-200 rounded-full"></div>
                      <div className="h-1 w-2 bg-orange-100 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute -bottom-8 -right-8 text-orange-100/60 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                  <ShieldCheck size={180} strokeWidth={1} />
                </div>

                {/* Subtle Grainy Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProfileField = ({
  label,
  icon,
  name,
  value,
  editMode,
  onChange,
  fullWidth = false,
}) => (
  <div className={`space-y-3 ${fullWidth ? "col-span-full" : ""}`}>
    <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative group">
      <div
        className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${editMode ? "text-orange-500" : "text-gray-300"}`}
      >
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <input
        name={name}
        value={value || ""}
        disabled={!editMode}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`w-full pl-14 pr-6 py-4 rounded-2xl border-2 transition-all duration-300 font-medium ${
          editMode
            ? "border-orange-100 focus:border-orange-500 bg-orange-50/30 outline-none ring-8 ring-orange-500/5"
            : "border-transparent bg-gray-50 text-gray-700"
        }`}
      />
    </div>
  </div>
);

export default DonorProfile;
