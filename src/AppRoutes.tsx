import { RouteObject } from "react-router-dom";
import PrivateRoute from "./core/hoc/PrivateRoute";
import { authRoutes } from "./pages/auth/authRoutes";
import LayoutAdmin from "./shared/layout/LayoutAdmin";
import dashboardRoutes from "./pages/dashboard/dashboardRoutes";
import {companiesRoutes} from "./pages/companies/CompaniesRoutes.tsx";
import productsRoutes from "./pages/products/ProductsRoutes.tsx";
import salesRoutes from "./pages/sales/SalesRoutes.tsx";
import providersRoutes from "./pages/providers/ProvidersRoutes.tsx";
import rolesRoutes from "./pages/roles/RoleRoutes.tsx";
import { usersRoutes } from "./pages/users/UsersRoutes.tsx";

const appRoutes: RouteObject[] = [
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    ...dashboardRoutes,
                    ...companiesRoutes,
                    ...productsRoutes,
                    ...salesRoutes,
                    ...providersRoutes,
                    ...rolesRoutes,
                    ...usersRoutes
                ]
            }
        ],
    },
    ...authRoutes,
    {
        path: '*',
        element: <>Not found</>
    },
]

export default appRoutes;