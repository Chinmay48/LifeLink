import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Unauthorized from "../pages/common/Unauthorized";
import DonorDashboard from "../pages/donor/Dashboard";
import DonorProfile from "../pages/donor/Profile";
import HospitalDashboard from "../pages/hospital/Dashboard";
import HospitalProfile from "../pages/hospital/Profile";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Onboarding from "../pages/common/Onboarding";
import CreateDonation from "../pages/donor/donations/CreateDonation";
import DonationHistory from "../pages/donor/donations/DonationHistory";


export const publicRoutes=[
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/about",
        element:<About/>
    },
    {
        path:"/unauthorized",
        element:<Unauthorized/>
    },
    {
        path:"/onboarding",
        element:<Onboarding/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
]

export const donorRoutes=[
    {
        path:"dashboard",
        element:<DonorDashboard/>,
          role: "DONOR"
    },
    {
        path:"profile",
        element:<DonorProfile/>,
          role: "DONOR"
    },
    {
        path:"donations/new",
        element:<CreateDonation/>,
        role:"DONOR"
        
    },
    {
        path:"donor-history",
        element:<DonationHistory/>,
        role:"DONOR"
        
    }

]


export const hospitalRoutes=[

    {
        path:"dashboard",
        element:<HospitalDashboard/>,
        role: "HOSPITAL"
    },
    {
        path:"profile",
        element:<HospitalProfile/>,
        role: "HOSPITAL"
    }
]