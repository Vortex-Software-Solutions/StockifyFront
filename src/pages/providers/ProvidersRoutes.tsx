import {RouteObject} from "react-router-dom";
import ProvidersList from "./ProvidersList.tsx";
import Inbounds from "./Inbounds.tsx";
import ProviderReturns from "./ProviderReturns.tsx";

const ProvidersRoutes: RouteObject[] = [
    {
        path: "providers",
        children: [
            {
                path: "",
                element: <ProvidersList />
            },
            {
                path: "inbounds",
                element: <Inbounds />
            },
            {
                path: "returns",
                element: <ProviderReturns />
            }
        ]
    }
]

export default ProvidersRoutes