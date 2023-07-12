import React from 'react';
import './App.css';
import {observer} from "mobx-react-lite";
import AllRouters from "./router/Allrouters";
import TaskStoreImpl, {TaskStore} from "./store/task";
import ReactiveStatisticsGame from "./store/statistics";
import GameStatistics from "./domain/gameStatistics";
import SessionStoreImpl from "./store/session";
import {GameStatisticsContext, SessionStoreContext, TaskContext} from './providers/store';

const App: React.FC = observer(() => {
    const currentTask: TaskStore = React.useMemo(() => new TaskStoreImpl(), [])
    const statistics: GameStatistics = React.useMemo(() => new ReactiveStatisticsGame(), [])
    const session = React.useMemo(() => new SessionStoreImpl(), []);
    return (
        <div className="App">
            <GameStatisticsContext.Provider value={statistics}>
                <TaskContext.Provider value={currentTask}>
                    <SessionStoreContext.Provider value={session}>
                        <AllRouters />
                    </SessionStoreContext.Provider>
                </TaskContext.Provider>
            </GameStatisticsContext.Provider>
        </div>
    );
})

export default App;
