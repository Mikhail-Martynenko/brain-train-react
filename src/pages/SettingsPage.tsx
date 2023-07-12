import React, {useContext, useState} from 'react';
import {ALLOWED_OPERATORS, GenerateTaskParams, Operator} from "../domain/domain";
import game, {MAX_DIFFICULTY_LEVEL} from "../domain/game";
import SliderRange from "../components/SliderRange";
import {useNavigate} from "react-router-dom";
import {TaskContext} from "../store/task";
import {observer} from "mobx-react-lite";
import {StatisticsGameContext} from "../store/statistics";
import {SessionStoreContext} from "../store/session";

const SettingsPage: React.FC = observer(() => {
    const [selectedOperators, setSelectedOperators] = useState<Operator[]>(ALLOWED_OPERATORS);
    const [roundTime, setRoundTime] = useState(7)
    const [selectedDifficulty, setSelectedDifficulty] = useState(game.config.level);

    const navigate = useNavigate()

    const taskStore = useContext(TaskContext);
    const statistics = useContext(StatisticsGameContext)
    const session = useContext(SessionStoreContext)

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
        const selectedOperatorSymbols = getSelectedOperatorSymbols(selectedOperators);
        const allowedOperators = filterAllowedOperators(selectedOperatorSymbols);

        generateTaskAndAddSession({complexity: selectedDifficulty, allowedOperators: allowedOperators});
        navigate('/game')
    };

    const getSelectedOperatorSymbols = (operators: Operator[]): string[] => {
        return operators.filter((operator) => operator.checked).map((operator) => operator.label);
    };

    const filterAllowedOperators = (operatorSymbols: string[]): Operator[] => {
        return ALLOWED_OPERATORS.filter((operator) => operatorSymbols.includes(operator.label));
    };

    const generateTaskAndAddSession = (params: GenerateTaskParams) => {
        if (!session || !taskStore || !statistics) return;
        taskStore.currentTask = game.generator.generateTask(params);
        session.timer = roundTime;
        statistics.addSession(session);
    }

    const totalTask = () => {
        if (!statistics) return 0;
        return statistics?.getLastSession()?.score + statistics?.getLastSession().miss
    }

    return (
        <div>
            <div>
                <h1>Привет!</h1>
                <div className="statistic_text">
                    <p>Добро пожаловать на {statistics?.statistics.sessions.length} тренировочный день,</p>
                    <p>Ваш последний результат - решено {statistics?.getLastSession()?.score} из {totalTask()}</p>
                    <p>Общая точность {statistics?.getAccuracy()}%</p>
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