import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser, registerUser } from "../features/auth/authAPI";
import useAppContext from "./useAppContext";

export const useAuth = () => {
  const navigate = useNavigate();
  const { login, logout } = useAppContext();

  const handleLogin = async (formData) => {
    
    try {
      console.log("STEP 1: before API");
      const res = await loginUser(formData);
      
      console.log("STEP 2: After API");
      console.log(res)
      
      login(res.user, res.token);
      toast.success(res.message || "Login successfully");
      if (!res.user.profileCompleted) {
        navigate("/onboarding");
        return;
      }

      if (res.user.role === "DONOR") {
        navigate("/donor/dashboard");
      } else {
        navigate("/hospital/dashboard");
      }
    } catch (error) {
      console.log("ERROR:", error);
  toast.error(error.message || "Login failed");
    }
  };

  const handleRegister=async(formData)=>{
    try {
        const res= await registerUser(formData);
        toast.success(res.message)
        navigate("/login")
        
    } catch (error) {
        toast.error(error.message)
    }
  }

  const handleLogout=()=>{
    logout()
    navigate("/login")
  }
  return{
    handleLogin,handleLogout,handleRegister
  }
};
