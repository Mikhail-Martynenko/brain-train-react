import {createContext} from "react";
import {TaskStore} from "../store/task";
import CurrentSession from "../domain/session";
import GameStatistics from "../domain/gameStatistics";

export const TaskContext = createContext<TaskStore>(null!);
export const SessionStoreContext = createContext<CurrentSession>(null!);
export const GameStatisticsContext = createContext<GameStatistics>(null!);
