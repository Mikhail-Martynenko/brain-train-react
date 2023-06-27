import React from 'react';
import './App.css';
import {observer} from "mobx-react-lite";
import CounterStore from "./store/task";
import AllRouters from "./router/Allrouters";

const App: React.FC = observer(() => {
    const counter = React.useMemo(() => new CounterStore(), []);
    return (
        <div className="App">
            {/*<Counter {...counter} />*/}
            <AllRouters />
        </div>
    );
})

export default App;
