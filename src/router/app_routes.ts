import GamePage from "../pages/GamePage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";
import {RouteRecord} from "./types";

export const getAppRoutes = (): RouteRecord[] => {
    return [
        {
            path: "/",
            name: "settings",
            component: SettingsPage,
        },
        {
            path: "/game",
            name: "game",
            component: GamePage,
        },

        {
            path: "*",
            name: "Not Found",
            component: NotFoundPage,
        },
    ];
};
