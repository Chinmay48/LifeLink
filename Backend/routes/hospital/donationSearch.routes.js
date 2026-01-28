import express from "express"
import authMiddleware from "../../middleware/auth.Middleware.js"
import roleMiddleware from "../../middleware/role.middleware.js"
import expireDonationJob from "../../jobs/expiryDonation.job.js"

const router=express.Router()
router.use(authMiddleware);
router.use(roleMiddleware)
router.get("/search",expireDonationJob)

export default  router