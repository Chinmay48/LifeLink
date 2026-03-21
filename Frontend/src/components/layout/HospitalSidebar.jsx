import { NavLink, useNavigate } from "react-router-dom";
import {
  CircleUser,
  ClipboardPlus,
  History,
  LogOut,
  Hospital,
  ChevronRight,User
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getHospitalProfile } from "../../features/hospital/hospitalAPI";
import logo from "../../assets/images/logo.png";
const HospitalSidebar = ({ isOpen, setIsOpen }) => {
  const [hospital, setHospital] = useState("");
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  // Track window width to prevent animation glitches on desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const fetchHospital = async () => {
      try {
        const res = await getHospitalProfile();
        setHospital(res.data);
        console.log(res.data)
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchHospital();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const menuItems = [
    { name: "Dashboard", icon: CircleUser, path: "/hospital/dashboard" },
    {
      name: "Create Patient",
      icon: ClipboardPlus,
      path: "/hospital/patient/new",
    },
    { name: "Patient History", icon: History, path: "/hospital/patients" },
    { name: "Profile", icon: User, path: "/hospital/profile" },
    {name:"Organ Bank",icon:Hospital,path:"/hospital/organ-bank"}
  ];
  return (
    <div>
      <motion.div
        initial={false}
        animate={{ x: isMobile ? (isOpen ? 0 : "-100%") : 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`
        fixed top-0 left-0 z-50 h-screen w-72
        bg-white border-r border-slate-200 p-6 
        flex flex-col justify-between
        md:sticky md:top-0 md:translate-x-0
      `}
      >
        {/* TOP SECTION */}
        <div className="flex flex-col h-full">
          {/* LOGO */}
          <div
            className="flex items-center justify-center gap-3 mb-8 px-2 cursor-pointer transition-transform active:scale-95"
            onClick={() => {
              navigate("/hospital/dashboard");
              setIsOpen(false);
            }}
          >
            <img src={logo} alt="logo" className="h-15 w-auto object-contain" />
          </div>

          {/* PROFILE CARD */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Hospital Account
            </p>
            <h2 className="text-base font-bold text-slate-800 truncate">
              {hospital.hospitalName || "Guest Hospital Admin"}
            </h2>
            <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-100 text-orange-700">
              Verified Hospital
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-2 flex-grow">
            <p className="text-[11px] font-bold text-slate-400 uppercase px-4 mb-2 tracking-widest">
              Main Menu
            </p>

            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium
                  ${
                    isActive
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`
                  }
                >
                  <div className="flex items-center gap-3 z-10">
                    <Icon size={20} />
                    <span className="text-sm">{item.name}</span>
                  </div>

                  <ChevronRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* BOTTOM SECTION */}
          <div className="pt-6 mt-auto border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 font-semibold hover:bg-red-50 hover:text-red-600 transition-colors group"
            >
              <div className="p-2 rounded-lg group-hover:bg-red-100 transition-colors">
                <LogOut size={18} />
              </div>
              <span className="text-sm font-bold">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HospitalSidebar;
