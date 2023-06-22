import React from 'react';
import {observer} from "mobx-react-lite";

interface Props {
    increment: () => void;
    decrement: () => void;
    count: number;
}

const Counter: React.FC<Props> = observer(({count, increment, decrement}) => {
    return (
        <div>
            {count}
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>
        </div>
    );
});

export default Counter;