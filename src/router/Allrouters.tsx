import React, {createContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {getAppRoutes} from "./app_routes";
import {RouteRecord} from "./types";
import TaskStoreImpl, {TaskContext, TaskStore} from "../store/task";
import {observer} from "mobx-react-lite";

const AllRouters: React.FC = observer(() => {
    const APP_ROUTES: RouteRecord[] = getAppRoutes();
    const currentTask: TaskStore = new TaskStoreImpl();
    return (
        <TaskContext.Provider value={currentTask}>
            <Routes>
                {APP_ROUTES.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component/>}/>
                ))}
            </Routes>
        </TaskContext.Provider>
    );
});

export default React.memo(AllRouters);