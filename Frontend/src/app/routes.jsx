import {Routes,Route} from "react-router-dom"
import protectedRoute from "./ProtectedRoute"
import { publicRoutes,donorRoutes,hospitalRoutes } from "./routerConfig"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes=()=>{
    return(
        <Routes>
            {publicRoutes.map((route,index)=>(
              <Route key={index} path={route.path} element={route.element} />
            ))}

            {donorRoutes.map((route,index)=>(
              <Route key={index} path={route.path} element={<protectedRoute allowedRole={route.role}>
                  {route.element}
              </protectedRoute>} />
            ))}

            {hospitalRoutes.map((route,index)=>(
               <Route key={index} path={route.path} element={<ProtectedRoute allowedRole={route.role}>
                {route.element}
               </ProtectedRoute>} />
            ))
            }

        </Routes>
    )
}

export default AppRoutes;