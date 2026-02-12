import { createContext,useContext,useState,useEffect } from "react";

export const AppContext=createContext(null)

export const AppProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [token,setToken]=useState(null)
    const [userLocation,setUserLocation]=useState(null)
    const [appLoading,setAppLoading]=useState(true)

    const isAuthenticated=!!token
    const role=user?.role || null
    const profileCompleted=user?.profileCompleted || false

    useEffect(()=>{
        const storedUser=localStorage.getItem("user")
        const storedToken=localStorage.getItem("token")
        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
        }
        setAppLoading(false)
    },[])

    const login=(userData,jwtToken)=>{
        setUser(userData)
        setToken(jwtToken)
        localStorage.setItem("user",JSON.stringify(userData))
        localStorage.setItem("token",jwtToken)

    }

    const logout=()=>{
        setUser(null)
        setToken(null)
        setUserLocation(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")

    }

    const updateUser=(updateFields)=>{
        setUser((prev)=>{
            const updatedUser={...prev,...updateFields};
            localStorage.setItem("user",JSON.stringify(updatedUser))
            return updatedUser
        })
    }

    const value={
        user,token,role,isAuthenticated,profileCompleted,userLocation,appLoading,login,logout,updateUser,setUserLocation
    }
    return (
        <AppContext.Provider value={value}>
               {children}
        </AppContext.Provider>
    )
}