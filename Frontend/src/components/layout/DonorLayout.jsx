import { Outlet } from "react-router-dom";
import DonorSidebar from "./DonorSidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import logo from "../../assets/images/logo.png"
const DonorLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* OVERLAY (Mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <DonorSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* MOBILE NAVBAR */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
           <img src={logo} className="h-8" alt="" />
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-5 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DonorLayout;