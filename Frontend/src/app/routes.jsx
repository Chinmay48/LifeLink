import { Routes, Route } from "react-router-dom";
import { publicRoutes, donorRoutes, hospitalRoutes } from "./routerConfig";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "../components/layout/PublicLayout";
import DonorLayout from "../components/layout/DonorLayout";
import HospitalLayout from "../components/layout/HospitalLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route
        path="/donor"
        element={
          <ProtectedRoute allowedRole="DONOR">
            <DonorLayout />
          </ProtectedRoute>
        }
      >
        {donorRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route
        path="/hospital"
        element={
          <ProtectedRoute allowedRole="HOSPITAL">
            <HospitalLayout />
          </ProtectedRoute>
        }
      >
        {hospitalRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
