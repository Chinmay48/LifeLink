import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Unauthorized from "../pages/common/Unauthorized";
import DonorDashboard from "../pages/donor/Dashboard";
import DonorProfile from "../pages/donor/Profile";
import HospitalDashboard from "../pages/hospital/Dashboard";
import HospitalProfile from "../pages/hospital/Profile";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";


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
        path:"/donor/dashboard",
        element:<DonorDashboard/>,
          role: "DONOR"
    },
    {
        path:"/donor/profile",
        element:<DonorProfile/>,
          role: "DONOR"
    },

]


export const hospitalRoutes=[

    {
        path:"/hospital/dashboard",
        element:<HospitalDashboard/>,
        role: "HOSPITAL"
    },
    {
        path:"/hospital/profile",
        element:<HospitalProfile/>,
        role: "HOSPITAL"
    }
]