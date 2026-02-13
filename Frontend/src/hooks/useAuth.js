import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { loginUser, registerUser } from "../features/auth/authAPI";
import useAppContext from "./useAppContext";

export const useAuth = () => {
  const navigate = useNavigate();
  const { login, logout } = useAppContext();

  const handleLogin = async (formData) => {
    try {
      const res = await loginUser(formData);
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
      toast.error(error.message);
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
