import {RouteObject} from "react-router-dom";
import RoleList from "./RoleList";
import RoleCreate from "./RoleCreate";
import RoleUpdate from "./RoleUpdate" ;

const RolesRoutes: RouteObject[] = [
    {
        path: "/roles",
        children: [
            {
                path: "",
                element: <RoleList />
            },
            {
                path: "create",
                element: <RoleCreate />
            },
            {
                path: "edit/:id",
                element: <RoleUpdate />
            }
        ]
    }
]

export default RolesRoutes