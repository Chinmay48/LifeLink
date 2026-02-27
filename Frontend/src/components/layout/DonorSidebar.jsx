import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  User,
  PlusCircle,
  History,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { getDonorProfile } from "../../features/donor/donorAPI";

const DonorSidebar = () => {
  const [donor, setDonor] = useState("");
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await getDonorProfile();
        setDonor(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchDonor();
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/donor/dashboard" },
    { name: "Profile", icon: User, path: "/donor/profile" },
    { name: "Create Donation", icon: PlusCircle, path: "/donor/donations/new" },
    { name: "Donation History", icon: History, path: "/donor/donations" },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 min-h-screen bg-slate-50 border-r border-slate-200 flex flex-col justify-between p-6 shadow-sm"
    >
      {/* TOP SECTION */}
      <div>
        {/* LOGO / BRANDING */}
        <div 
          className="flex items-center gap-3 mb-10 px-2 cursor-pointer"
          onClick={() => navigate("/donor/dashboard")}
        >
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
            <PlusCircle className="text-white" size={24} />
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tighter">
            DONOR<span className="text-orange-500">PRO</span>
          </span>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Welcome back,</p>
          <h2 className="text-lg font-bold text-slate-800 truncate">
            {donor.fullName || "Guest Donor"}
          </h2>
        </div>

        {/* MENU */}
       {/* MENU */}
<nav className="flex flex-col gap-1.5">
  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] px-4 mb-2">
    Main Menu
  </p>
  {menuItems.map((item, index) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={index}
        to={item.path}
        className={({ isActive }) =>
          `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 font-medium
          ${
            isActive
              ? "bg-orange-500 text-white shadow-md shadow-orange-200"
              : "text-slate-500 hover:bg-white hover:text-orange-600 hover:shadow-sm"
          }`
        }
      >
        {/* We destructure isActive here to use it inside the children */}
        {({ isActive }) => (
          <>
            <div className="flex items-center gap-3">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm">{item.name}</span>
            </div>
            <ChevronRight
              size={14}
              className={`transition-transform duration-300 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
              }`}
            />
          </>
        )}
      </NavLink>
    );
  })}
</nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="pt-6 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-4 rounded-xl text-slate-500 font-bold hover:bg-red-50 hover:text-red-600 transition-all duration-300 group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
            <LogOut size={18} />
          </div>
          <span className="text-sm">Logout Session</span>
        </button>
      </div>
    </motion.div>
  );
};

export default DonorSidebar;