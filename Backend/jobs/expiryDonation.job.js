import cron from"node-cron"
import Donation from "../models/Donation.js"

const expireDonationJob=()=>{

    cron.schedule("*/5 * * * *",async()=>{
        try {
            const now=new Date()
            const result=await Donation.updateMany({
                status:"AVAILABLE",
                expiryTime:{$lte:now}
            },{
          $set: { status: "EXPIRED" },
        })

        if (result.modifiedCount > 0) {
        console.log(
          `[CRON] Expired ${result.modifiedCount} donations at ${now.toISOString()}`
        );
      }
        } catch (error) {
            console.error("[CRON] Failed to expire donations:", error.message);
        }
    })
    
}

export default expireDonationJob