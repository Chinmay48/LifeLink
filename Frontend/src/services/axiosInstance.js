import axios from "axios"

const axiosInstance=axios.create({
    baseURL:"http://localhost:8000/api",
    headers:{
        "Content-Type":"application/josn"
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token")
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=> Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error) => {
    const status = error.response?.status;

    const message =
      error.response?.data?.message || "Something went wrong";

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject({
      success: false,
      status,
      message
    });
  }
);

export default axiosInstance;