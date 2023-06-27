import React, {createContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {getAppRoutes} from "./app_routes";
import {RouteRecord} from "./types";
import {observer} from "mobx-react-lite";

const AllRouters: React.FC = observer(() => {
    const APP_ROUTES: RouteRecord[] = getAppRoutes();

    return (
            <Routes>
                {APP_ROUTES.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component/>}/>
                ))}
            </Routes>
    );
});

export default React.memo(AllRouters);