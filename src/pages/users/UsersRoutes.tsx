import {RouteObject} from "react-router-dom";
import UsersList from "./UsersList.tsx";


export const usersRoutes: RouteObject[] = [
    {
        path: "/users",
        children: [
            {
                path: "",
                element: <UsersList />
            },
            
        ]
    },
]