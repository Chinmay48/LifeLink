import authRoutes from "./auth/auth.routes.js"
import donorRoutes from "./donor/donor.routes.js"
import donationRoutes from "./donor/donation.routes.js"
import hosipitalRoutes from "./hospital/hospital.routes.js"
import patientRoutes from "./hospital/patient.routes.js"
import organBankRoutes from "./hospital/organBank.routes.js"
import transplantRoutes from "./hospital/transplantRequest.routes.js"
const registerRoutes=(app)=>{
    app.use("/auth",authRoutes)
    app.use("/donor",donorRoutes)
    app.use("/donation",donationRoutes)
    app.use("/hospital",hosipitalRoutes)
    app.use("/patients",patientRoutes)
    app.use("/organ-bank",organBankRoutes)
    app.use("/hospital/transplant-request",transplantRoutes)

}

export default registerRoutes;