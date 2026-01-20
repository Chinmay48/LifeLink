import authRoutes from "./auth/auth.routes.js"
import donorRoutes from "./donor/donor.routes.js"
const registerRoutes=(app)=>{
    app.use("/auth",authRoutes)
    app.use("/donor",donorRoutes)
}

export default registerRoutes;