import {RouteObject} from "react-router-dom";
import SalesList from "./SalesList.tsx";
import Earnings from "./Earnings.tsx";
import SaleReturns from "./SaleReturns.tsx";

const salesRoutes: RouteObject[] = [
    {
        path: "sales",
        children: [
            {
                path: "",
                element: <SalesList />
            },
            {
                path: "earnings",
                element: <Earnings />
            },
            {
                path: "returns",
                element: <SaleReturns />
            }
        ]
    }
]

export default salesRoutes