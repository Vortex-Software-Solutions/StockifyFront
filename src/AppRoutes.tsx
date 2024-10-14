import { RouteObject } from "react-router-dom";
import PrivateRoute from "./core/hoc/PrivateRoute";
import { authRoutes } from "./pages/auth/authRoutes";
import LayoutAdmin from "./shared/layout/LayoutAdmin";
import dashboardRoutes from "./pages/dashboard/dashboardRoutes";
import {companiesRoutes} from "./pages/companies/CompaniesRoutes.tsx";
import productsRoutes from "./pages/products/ProductsRoutes.tsx";
import salesRoutes from "./pages/sales/SalesRoutes.tsx";
import providersRoutes from "./pages/providers/ProvidersRoutes.tsx";

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
                    ...providersRoutes
                ]
            }
        ],
    },
    {
        path: '*',
        element: <>Not found</>
    },
    ...authRoutes
]

export default appRoutes;