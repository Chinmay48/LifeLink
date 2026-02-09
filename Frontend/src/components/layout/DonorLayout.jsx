import { Outlet } from "react-router-dom";
import DonorSidebar from "./DonorSidebar";



const DonorLayout = () => {
  return (
    <div className="flex">
      <DonorSidebar/>
      <div className="flex-1 p-5">
       <Outlet/>
      </div>
      
    </div>
  )
}

export default DonorLayout
