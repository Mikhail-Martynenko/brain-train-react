import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import TimerSession from '../components/TimerSession';
import game from '../domain/game';
import {observer} from "mobx-react-lite";
import {TaskContext} from "../store/task";
import {SessionStoreContext} from "../store/session";

const GameContainer: React.FC = observer(() => {
    const [inputValues, setInputValues] = useState<Record<number, any>>({});
    const taskStore = useContext(TaskContext);
    const [equation, setEquation] = useState('')

    const session = useContext(SessionStoreContext)

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
            session?.addToScore()
        } else {
            alert('Неверно!');
            generateNewTask();
            session?.addToMiss()
        }
    };

    const generateEquation = useCallback(() => {
        let equation = `${taskStore?.currentTask?.startValue}`;
        if (taskStore?.currentTask?.operators) {
            for (let i = 0; i < taskStore.currentTask?.complexity; i++) {
                equation += ` ${taskStore.currentTask?.operators[i].displaySign} _`;
            }
        }
        equation += ` = ${taskStore?.currentTask?.result}`;
        return equation;
    }, [taskStore?.currentTask?.startValue, taskStore?.currentTask?.operators, taskStore?.currentTask?.complexity, taskStore?.currentTask?.result])

    const generateNewTask = () => {
        if (!taskStore?.currentTask) return;

        const params = {
            complexity: taskStore.currentTask.complexity,
            allowedOperators: taskStore.currentTask.operators
        };
        taskStore.currentTask = game.generator.generateTask(params);
    };

    useEffect(() => {
        setEquation(generateEquation());
        setInputValues({});
    }, [taskStore?.currentTask, generateEquation]);

    return (
        <div className="game-container">
            <div className="cancel">
                <Link to={'/'}>
                    <button>Отмена</button>
                </Link>
            </div>
            <TimerSession />
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
