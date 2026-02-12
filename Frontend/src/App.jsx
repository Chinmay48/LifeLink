import { Route, Routes } from "react-router-dom"
import './App.css'
import AppRoutes from "./app/routes"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./context/AppContext";
function App() {
  return (
    <>
    <AppProvider>
<AppRoutes/>
  <ToastContainer position="top-right" />
    </AppProvider>
  
    </>
  )
}

export default App
