import { Route, Routes } from "react-router-dom"
import './App.css'
import AppRoutes from "./app/routes"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
  <AppRoutes/>
  <ToastContainer position="top-right" />
    </>
  )
}

export default App
