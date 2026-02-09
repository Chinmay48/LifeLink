import { Outlet } from "react-router"
import HospitalSidebar from "./HospitalSidebar"

const HospitalLayout = () => {
  return (
    <div className="flex">
        <HospitalSidebar/>
        <div className="flex-1 p-5">
         <Outlet/>
        </div>
    </div>
  )
}

export default HospitalLayout
