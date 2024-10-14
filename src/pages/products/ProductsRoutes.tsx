import {RouteObject} from "react-router-dom";
import ProductsList from "./ProductsList.tsx";

const ProductsRoutes: RouteObject[] = [
    {
        path: "/products",
        children: [
            {
                path: "",
                element: <ProductsList />
            }
        ]
    }
]

export default ProductsRoutes