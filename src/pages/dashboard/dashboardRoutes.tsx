import { RouteObject } from "react-router-dom";
import Dashboard from "./Dashboard";

const dashboardRoutes: RouteObject[] = [
    {
        path: '',
        element: <Dashboard />,
    }
]

export default dashboardRoutes;