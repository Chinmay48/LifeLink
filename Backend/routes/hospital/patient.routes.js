import express from "express"
import { getPatients,createPatient } from "../../controllers/hospital/patient.controller.js"
import authMiddleware from "../../middleware/auth.Middleware.js"
import roleMiddleware from "../../middleware/role.middleware.js"
const router=express.Router()

router.post("/",authMiddleware,roleMiddleware("HOSPITAL_ADMIN"),createPatient)
router.get("/",authMiddleware,roleMiddleware("HOSPITAL_ADMIN"),getPatients)

export default router