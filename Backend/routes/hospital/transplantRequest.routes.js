import express from "express"

import authMiddleware from "../../middleware/auth.Middleware.js"
import roleMiddleware from "../../middleware/role.middleware.js"
import { createTransplantRequest,completeTransplant,matchDonationToRequest } from "../../controllers/hospital/transplantRequest.controller.js"
const router=express.Router()

router.use(authMiddleware)
router.use(roleMiddleware("HOSPITAL_ADMIN"))

router.post("/",createTransplantRequest)
router.post("/:id/match",matchDonationToRequest)
router.post("/:id/complete",completeTransplant)

export default router