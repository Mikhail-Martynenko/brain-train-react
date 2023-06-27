import React, {useState} from 'react';

const EquationContainer: React.FC<any> = ({currentTask, inputValues, updateInputValue}) => {

    // const [task, setTask] = useState(currentTask)
    const generateEquation = () => {
        let equation = `${currentTask.startValue}`;
        if (currentTask.operators) {
            for (let i = 0; i < currentTask.complexity; i++) {
                equation += ` ${currentTask.operators[i].displaySign} _`;
            }
        }
        equation += ` = ${currentTask.result}`;
        return equation;
    };

    const equation = generateEquation();

    return (
        <div className="equation-container">
            {equation.split('').map((char, index) => (
                <React.Fragment key={index}>
                    {char === '_' ? (
                        <input
                            className="equation-char"
                            value={inputValues[index]}
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
    );
};

export default EquationContainer;
