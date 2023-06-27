import React from 'react';
import './App.css';
import {observer} from "mobx-react-lite";
import AllRouters from "./router/Allrouters";
import TaskStoreImpl, {TaskContext, TaskStore} from "./store/task";
import ReactiveStatisticsGame, {StatisticsGameContext} from "./store/statistics";
import StatisticsGame from "./domain/statisticsGame";

const App: React.FC = observer(() => {
    const currentTask: TaskStore = new TaskStoreImpl();
    const statistics: StatisticsGame = new ReactiveStatisticsGame();

    return (
        <div className="App">
            <StatisticsGameContext.Provider value={statistics}>
                <TaskContext.Provider value={currentTask}>
                    <AllRouters/>
                </TaskContext.Provider>
            </StatisticsGameContext.Provider>
        </div>
    );
})

export default App;
