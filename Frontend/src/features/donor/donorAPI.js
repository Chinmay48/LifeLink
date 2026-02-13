import axiosInstance from "../../services/axiosInstance";

export const getDonorProfile=()=>{
    return axiosInstance.get("/donor/profile")
}

export const updateDonorProfile=(data)=>{
    return axiosInstance.put("/donor/profile",data)
}

export const updateAvailability=(isAvailable)=>{
    return axiosInstance.patch("/donor/availability",{
        isAvailable
    })
}


export const createDonation=(data)=>{
    return axiosInstance.post("/donor/donations",data)
}

export const getDonationHistory=()=>{
    return axiosInstance.get("/donor/donations")
}