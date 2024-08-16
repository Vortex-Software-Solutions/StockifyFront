import { RouteObject } from "react-router-dom";
import PrivateRoute from "./core/hoc/PrivateRoute";
import { authRoutes } from "./pages/auth/authRoutes";
import LayoutAdmin from "./shared/layout/LayoutAdmin";
import dashboardRoutes from "./pages/dashboard/dashboardRoutes";

const appRoutes: RouteObject[] = [
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    ...dashboardRoutes,
                    // ...residentialRoutes,
                    // ...houseRoutes,
                    // ...userRoutes,
                    // ...profileRoutes
                ]
            }
        ],
    },
    ...authRoutes
]

export default appRoutes;