import authRoutes from "./auth/auth.routes.js"
import donorRoutes from "./donor/donor.routes.js"
import donationRoutes from "./donor/donation.routes.js"
const registerRoutes=(app)=>{
    app.use("/auth",authRoutes)
    app.use("/donor",donorRoutes)
    app.use("/donation",donationRoutes)
}

export default registerRoutes;