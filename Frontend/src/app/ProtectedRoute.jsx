import {Navigate} from "react-router-dom"
import useAppContext from "../hooks/useAppContext"

const ProtectedRoute=({children, allowedRole})=>{
     const {user}=useAppContext()
     if(!user){
        return <Navigate to="/login"/>
     }

     if(allowedRole && user.role!==allowedRole){
        return <Navigate to="/unauthorized"/>
     }

     return children;
}

export default ProtectedRoute;