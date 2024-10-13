import {RouteObject} from "react-router-dom";
import React from "react";
import CompaniesList from "./admin/CompaniesList.tsx";

export const companiesRoutes: RouteObject[] = [
    {
        path: "/companies",
        children: [
            {
                path: "",
                element: <CompaniesList />
            }
        ]
    }
]