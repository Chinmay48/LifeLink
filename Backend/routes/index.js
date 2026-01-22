import authRoutes from "./auth/auth.routes.js"
import donorRoutes from "./donor/donor.routes.js"
import donationRoutes from "./donor/donation.routes.js"
import hosipitalRoutes from "./hospital/hospital.routes.js"
const registerRoutes=(app)=>{
    app.use("/auth",authRoutes)
    app.use("/donor",donorRoutes)
    app.use("/donation",donationRoutes)
    app.use("/hospital",hosipitalRoutes)
}

export default registerRoutes;