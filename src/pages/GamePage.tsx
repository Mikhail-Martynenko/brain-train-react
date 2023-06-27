import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import TimerSession from '../components/TimerSession';
import game from '../domain/game';
import {observer} from "mobx-react-lite";
import {TaskContext} from "../store/task";

const GameContainer: React.FC = observer(() => {
    const [inputValues, setInputValues] = useState<Record<number, any>>({});
    const taskStore = useContext(TaskContext);
    const [equation, setEquation] = useState('')

    const updateInputValue = (index: any, value: any) => {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [index]: value
        }));
    };
    const checkAnswer = () => {
        if (!taskStore?.currentTask) return;
        taskStore.currentTask.answer = Object.values(inputValues);
        const isCorrect = game.resolver.checkTask(taskStore.currentTask);

        if (isCorrect) {
            alert('Верно!');
            generateNewTask();
           // statisticsGame.incrementScore();
        } else {
            alert('Неверно!');
            generateNewTask();
           // statisticsGame.incrementMissed();
        }
    };
    const generateEquation = () => {
        let equation = `${taskStore?.currentTask?.startValue}`;
        if (taskStore?.currentTask?.operators) {
            for (let i = 0; i < taskStore.currentTask?.complexity; i++) {
                equation += ` ${taskStore.currentTask?.operators[i].displaySign} _`;
            }
        }
        equation += ` = ${taskStore?.currentTask?.result}`;
        return equation;
    };

    const generateNewTask = () => {
        if (!taskStore?.currentTask) return;

        const params = {
            complexity: taskStore.currentTask.complexity,
            allowedOperators: taskStore.currentTask.operators
        };
        taskStore.currentTask = game.generator.generateTask(params);
    };

    useEffect(() => {
        console.log(taskStore?.currentTask, 'GAME')
        setEquation(generateEquation());
        setInputValues({});
    }, [taskStore?.currentTask]);

    return (
        <div className="game-container">
            <div className="cancel">
                <Link to={'/'}>
                    <button>Отмена</button>
                </Link>
            </div>
            <TimerSession/>
            <div className="equation-container">
                {equation.split('').map((char, index: number) => (
                    <React.Fragment key={index}>
                        {char === '_' ? (
                            <input
                                className="equation-char"
                                value={inputValues[index] || ''}
                                onChange={(event) =>
                                    updateInputValue(index, Number(event.target.value))
                                }
                            />
                        ) : (
                            <span>{char}</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="buttons">
                <div className="helpers-buttons">
                    <button onClick={checkAnswer}>=</button>
                </div>
            </div>
        </div>
    );
});

export default GameContainer;
