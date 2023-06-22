import React from 'react';
import {Route, Routes} from "react-router-dom";
import {getAppRoutes} from "./app_routes";
import {RouteRecord} from "./types";


const AllRouters: React.FC = () => {
    const APP_ROUTES: RouteRecord[] = getAppRoutes();
    return (
        <Routes>
            {APP_ROUTES.map((route, index) => (
                <Route key={index} path={route.path} element={<route.component />} />
            ))}
        </Routes>
    );
};

export default React.memo(AllRouters);