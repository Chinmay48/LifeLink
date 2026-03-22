import axiosInstance from "../../services/axiosInstance";

export const getHospitalProfile=()=>{
    return axiosInstance.get("/hospital/profile")
}

export const updateHospitalProfile=(data)=>{
    return axiosInstance.put("/hospital/profile",data)
}

export const createPatient=(data)=>{
    return axiosInstance.post("/patients",data)
}

export const getPatients=()=>{
     return axiosInstance.get("/hospital/patients")
}

export const createTransplantRequest=(data)=>{
    return axiosInstance.post("/hospital/transplant-requests", data)
}

export const getInventory=()=>{
    return axiosInstance.get("/organ-bank")
}

export const updateInventoryStock=(organType,delta)=>{
    return axiosInstance.patch(`/organ-bank/${organType}`,{delta});
}