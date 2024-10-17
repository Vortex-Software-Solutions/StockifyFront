import React, { useEffect, useState } from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import { useTokenQuery } from "../features/authServerApi";
import { saveUserInfo, authenticate, selectIsAuthenticated } from "../slices/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LoaderBig from "src/shared/components/LoaderBig";


const PrivateRoute: React.FC = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [isAllowed, setIsAllowed] = useState<boolean | null>(isAuthenticated);
    const [hasCompany, setHasCompany] = useState<boolean | null>(null);

    const { data: tokenData, isLoading: tokenLoading } = useTokenQuery(undefined, { skip: isAuthenticated === true });

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenLoading && !isAuthenticated) {
            if (tokenData?.dataObject) {
                const token = tokenData.token ?? (() => {
                    const authData = localStorage.getItem('auth');
                    return authData ? JSON.parse(authData) : "";
                })();

                const userData = tokenData.dataObject;

                if (userData.companyId === null) setHasCompany(false);

                dispatch(saveUserInfo({
                    ...userData,
                    token
                }));

                dispatch(authenticate(true));
                setIsAllowed(true);
            } else {
                setIsAllowed(false);
            }
        }
    }, [tokenData, dispatch, tokenLoading, isAuthenticated]);

    useEffect(() => {
        if (isAllowed && hasCompany === false) {
            navigate("/register-company", { replace: true });
        }
    }, [isAllowed, hasCompany, navigate]);

    if (isAllowed === null) {
        return (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-40">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 bg-opacity-50 blur-lg z-50" />
                <LoaderBig />
            </div>
        );
    }

    if (!isAllowed) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
