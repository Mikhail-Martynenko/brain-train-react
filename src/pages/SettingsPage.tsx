import React, {useContext, useState} from 'react';
import {ALLOWED_OPERATORS, GenerateTaskParams, Operator, Task} from "../domain/domain";
import game, {MAX_DIFFICULTY_LEVEL} from "../domain/game";
import SliderRange from "../components/SliderRange";
import {useNavigate} from "react-router-dom";
import {TaskContext, TaskStore} from "../store/task";
import {observer} from "mobx-react-lite";

interface SettingPageProps {
    currentTask: Task | null;
}

const SettingsPage: React.FC<TaskStore> = observer(() => {
    const [selectedOperators, setSelectedOperators] = useState<Operator[]>(ALLOWED_OPERATORS);
    const [roundTime, setRoundTime] = useState(7)
    const [selectedDifficulty, setSelectedDifficulty] = useState(game.config.level);

    const taskStore = useContext(TaskContext);
    console.log(taskStore?.currentTask)
    const navigate = useNavigate()

    // const [currentTask, setCurrentTask] = useState<Task>({
    //     startValue: 0,
    //     operators: [],
    //     answer: [],
    //     result: 0,
    //     complexity: 1,
    // });

    function updateSelectedOperators(operatorSymbol: any) {
        const newOperators = selectedOperators.map(operator => {
            if (operator.symbol === operatorSymbol) {
                operator.checked = !operator.checked;
            }
            return operator;
        });
        setSelectedOperators(newOperators);

    }

    const startGame = (e: any) => {
        e.preventDefault()
        const selectedOperatorSymbols = selectedOperators.filter(operator => operator.checked).map(operator => operator.label);
        const allowedOperators = ALLOWED_OPERATORS.filter(operator => selectedOperatorSymbols.includes(operator.label));

        const params: GenerateTaskParams = {complexity: selectedDifficulty, allowedOperators: allowedOperators};

        if (!taskStore) return;
        taskStore.currentTask = game.generator.generateTask(params);
        console.log(taskStore.currentTask);

        navigate('/game')
    };

    return (
        <div>
            <div>
                <h1>Привет!</h1>
                <div className="statistic_text">
                    <p>Добро пожаловать на ??? тренировочный день,</p>
                    <p>Ваш последний результат - решено ??? из ???</p>
                    <p>Общая точность ???%</p>
                </div>
            </div>
            <form onSubmit={startGame}>
                <h2>Настройки</h2>
                <SliderRange
                    label={'Длительность'} onChange={(e) => setRoundTime(parseInt(e.target.value))} value={roundTime}
                    min={1} max={15}
                />
                <SliderRange
                    label={'Сложность'} onChange={(e) => setSelectedDifficulty(parseInt(e.target.value))}
                    value={selectedDifficulty}
                    min={1} max={MAX_DIFFICULTY_LEVEL}
                />
                <div className="operators">
                    {ALLOWED_OPERATORS.map((operator) => (
                        <label key={operator.symbol}>
                            <input
                                type="checkbox"
                                checked={operator.checked}
                                onChange={() => updateSelectedOperators(operator.symbol)}
                            />
                            {operator.label}
                        </label>
                    ))}
                </div>
                <button className="start_game_button" type="submit">Play!</button>
            </form>

        </div>
    );
});

export default SettingsPage;