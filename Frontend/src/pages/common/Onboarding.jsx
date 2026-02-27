import React from 'react'
import { motion } from "framer-motion"
import DonorForm from '../donor/DonorForm'
import HospitalForm from '../hospital/HospitalForm'
import useAppContext from '../../hooks/useAppContext'
import { HeartPulse } from 'lucide-react'

const Onboarding = () => {
  const { role } = useAppContext()

  const slugToTitle=(slug="")=>{
     return slug.split("_").map((word)=>word[0].toUpperCase()+word.slice(1,word.length).toLowerCase()).join(" ")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7ed] p-4 md:p-10 relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white shadow-2xl shadow-orange-100/50 rounded-[2rem] overflow-hidden flex flex-col md:flex-row border border-orange-100"
      >
        
        {/* Side Info Panel */}
       <div className="md:w-1/3 bg-slate-800 p-8 text-white flex flex-col justify-between relative">
  
  <div>
    {/* Icon */}
    <div className="bg-orange-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-8">
      <HeartPulse className="text-orange-400 h-7 w-7" />
    </div>

    {/* Heading */}
    <h2 className="text-4xl font-bold mb-6">Join the Life-Saving Network.</h2>
            <p className="text-orange-100 leading-relaxed text-lg">
              {role === "DONOR" 
                ? "Your contribution can give someone a second chance at life. Let's get your profile ready." 
                : "Help us streamline emergency response. Connect your facility to our real-time database."}
            </p>
  </div>

  {/* Features */}
  <div className="mt-8 space-y-4">
    <div className="flex items-center gap-3 text-sm text-slate-300">
      <div className="h-2 w-2 bg-orange-400 rounded-full" />
      Verified Secure Protocol
    </div>

    <div className="flex items-center gap-3 text-sm text-slate-300">
      <div className="h-2 w-2 bg-orange-300 rounded-full" />
      Real-time Matching Active
    </div>
  </div>
</div>

        {/* Form Panel */}
        <div className="flex-1 p-8 md:p-12 max-h-[90vh] overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            
            <header className="mb-10 text-center md:text-left">
              <span className="text-orange-600 font-semibold tracking-wider text-xs uppercase">
                Profile Setup
              </span>

              <h2 className="text-3xl font-extrabold text-gray-800 mt-1">
                {role === "DONOR" ? "Donor Information" : "Hospital Details"}
              </h2>
            </header>

            {role === "DONOR" ? <DonorForm /> : <HospitalForm />}

            <p className="text-center text-gray-400 text-xs mt-8">
              By submitting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default Onboarding