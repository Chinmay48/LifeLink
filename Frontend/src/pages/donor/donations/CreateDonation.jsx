import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as LuIcons from "react-icons/lu"
import { HiOutlineArrowRight, HiOutlineClock } from "react-icons/hi2";
import OrganData from "../../../data/organs.json";
import { showSuccess, showError } from "../../../utils/toast";
import { createDonation } from "../../../features/donor/donorAPI";

// Dynamic Icon Resolver
const OrganIcon = ({ name, className, style }) => {
  const IconComponent = GiIcons[name] || MdIcons[name] || LuIcons[name] || GiIcons.GiHealthNormal;
  return <IconComponent className={className} style={style} />;
};

const CreateDonation = () => {
  const [formData, setFormData] = useState({ organType: "", subType: "", expiryTime: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createDonation(formData);
      
      showSuccess(res.message);
      setFormData({ organType: "", subType: "", expiryTime: "" });
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-10 px-6">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100"
  >
    <div className="flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="lg:w-1/4 bg-orange-500 p-12 text-white flex flex-col justify-between relative overflow-hidden">

        <div className="relative z-10">
          <div className="w-14 h-14 bg-green-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-400/40">
            <GiIcons.GiHealthNormal size={26} />
          </div>

          <h2 className="text-3xl font-bold leading-tight">
            New Life Donation
          </h2>

          <p className="text-white/90 mt-4 text-sm leading-relaxed">
            Your contribution connects donors with patients in urgent need.
            Help us save lives through the power of donation.
          </p>
        </div>

        {/* Decorative Shape */}
        <GiIcons.GiAbstract014
          className="absolute -bottom-12 -left-12 text-white opacity-30"
          size={260}
        />

      </div>

      {/* RIGHT PANEL */}
      <div className="lg:w-3/4 p-10 lg:p-14">

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* STEP 1 */}
          <section>
            <header className="mb-6">
              <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">
                Step 01
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                Select Organ Type
              </h3>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

              {Object.entries(OrganData).map(([key, data]) => (
                <motion.button
                  key={key}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setFormData({ ...formData, organType: key, subType: "" })
                  }
                  className={`relative group flex flex-col items-center p-5 rounded-2xl border transition-all duration-300 ${
                    formData.organType === key
                      ? "border-orange-500 bg-orange-50 shadow-sm"
                      : "border-slate-100 hover:border-orange-200 bg-white"
                  }`}
                >
                  <div
                    className={`p-4 rounded-xl mb-3 transition-colors ${
                      formData.organType === key
                        ? "bg-white text-orange-500 shadow-sm"
                        : "bg-slate-50 text-slate-400 group-hover:text-orange-400"
                    }`}
                  >
                    <OrganIcon name={data.icon} size={44} />
                  </div>

                  <span
                    className={`text-[11px] font-bold tracking-wide uppercase ${
                      formData.organType === key
                        ? "text-orange-600"
                        : "text-slate-500"
                    }`}
                  >
                    {key}
                  </span>
                </motion.button>
              ))}

            </div>
          </section>

          {/* STEP 2 + STEP 3 */}
          <AnimatePresence mode="wait">
            {formData.organType && (
              <motion.section
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* SUBTYPE */}
                <div>
                  <header className="mb-4">
                    <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">
                      Step 02
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">
                      Anatomical Detail
                    </h3>
                  </header>

                  <div className="relative">
                    <select
                      name="subType"
                      value={formData.subType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subType: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-slate-700 font-semibold appearance-none focus:ring-2 focus:ring-orange-400/30 transition-all cursor-pointer"
                    >
                      <option value="">Select sub-type...</option>

                      {OrganData[formData.organType].subTypes.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub.replace("_", " ")}
                        </option>
                      ))}
                    </select>

                    <MdIcons.MdKeyboardArrowDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                  </div>
                </div>

                {/* EXPIRY */}
                <div>
                  <header className="mb-4">
                    <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">
                      Step 03
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">
                      Expiry Threshold
                    </h3>
                  </header>

                  <div className="relative">
                    <HiOutlineClock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />

                    <input
                      type="datetime-local"
                      value={formData.expiryTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expiryTime: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-5 text-slate-700 font-semibold focus:ring-2 focus:ring-orange-400/30 transition-all"
                    />
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* SUBMIT */}
          <motion.button
            disabled={loading || !formData.subType}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-3 transition-all duration-300 ${
              loading || !formData.subType
                ? "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-400 shadow-orange-200"
            }`}
          >
            {loading ? "Processing..." : "Finalize Donation"}
            <HiOutlineArrowRight size={20} />
          </motion.button>

        </form>
      </div>
    </div>
  </motion.div>
</div>
  );
};

export default CreateDonation;