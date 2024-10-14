import {RouteObject} from "react-router-dom";
import React from "react";
import CompaniesList from "./admin/CompaniesList.tsx";
import CompanyCreate from "./admin/CompanyCreate.tsx";
import CompanyUpdate from "./admin/CompanyUpdate.tsx";

export const companiesRoutes: RouteObject[] = [
    {
        path: "/companies",
        children: [
            {
                path: "",
                element: <CompaniesList />
            },
            {
                path: "create",
                element: <CompanyCreate />
            },
            {
                path: "edit/:id",
                element: <CompanyUpdate />
            }
        ]
    }
]