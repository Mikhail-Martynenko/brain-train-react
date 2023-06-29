import React from 'react';
import './App.css';
import {observer} from "mobx-react-lite";
import AllRouters from "./router/Allrouters";
import TaskStoreImpl, {TaskContext, TaskStore} from "./store/task";
import ReactiveStatisticsGame, {StatisticsGameContext} from "./store/statistics";
import StatisticsGame from "./domain/statisticsGame";
import SessionStoreImpl, {SessionStoreContext} from "./store/session";

const App: React.FC = observer(() => {
    const currentTask: TaskStore = React.useMemo(() => new TaskStoreImpl(), [])
    const statistics: StatisticsGame = React.useMemo(() => new ReactiveStatisticsGame(), [])
    const session = React.useMemo(() => new SessionStoreImpl(), []);
    return (
        <div className="App">
            <StatisticsGameContext.Provider value={statistics}>
                <TaskContext.Provider value={currentTask}>
                    <SessionStoreContext.Provider value={session}>
                        <AllRouters />
                    </SessionStoreContext.Provider>
                </TaskContext.Provider>
            </StatisticsGameContext.Provider>
        </div>
    );
})

export default App;
