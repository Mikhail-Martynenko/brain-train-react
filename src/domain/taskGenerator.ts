import {GenerateTaskParams, Generator, Operator, Task} from "./domain";
import Random from "../utils/index";

class TaskGenerator implements Generator {
    protected _MIN_ALLOWED_NUMBER = 1;
    protected _MAX_ALLOWED_NUMBER = 10;

    protected generateRandomOperators(complexity: number, allowedOperators: Operator[]) {
        const operators: Operator[] = [];
        for (let i = 0; i < complexity; i++) {
            const randomOperator = this.generateRandomOperator(allowedOperators)
            operators.push(randomOperator);
        }
        return operators;
    }

    protected generateRandomOperator(allowedOperators: Operator[]): Operator {
        return this.pickRandomItemFromArray(allowedOperators);
    }

    protected generateRandomNumbers(complexity: number): number[] {
        const hiddenNumbers: number[] = [];
        for (let i = 0; i < complexity; i++) {
            const hiddenNumber = this.generateRandomNumber(this.MIN_ALLOWED_NUMBER, this.MAX_ALLOWED_NUMBER)
            hiddenNumbers.push(hiddenNumber);
        }
        return hiddenNumbers;
    }

    protected generateRandomNumber(minNumber: number, maxNumber: number): number {
        return this.getRandomInteger(minNumber, maxNumber)
    }

    protected pickRandomItemFromArray(arr: Operator[]) {
        return Random.pickArrayMember(arr)
    }

    protected getRandomInteger(min: number, max: number): number {
        return Random.getRandomInteger(min, max);
    }

    public set MIN_ALLOWED_NUMBER(value: number) {
        if (value <= 0) throw new Error('MIN_ALLOWED_NUMBER must be greater than 0')
        this._MIN_ALLOWED_NUMBER = value;
    }

    public get MIN_ALLOWED_NUMBER() {
        return this._MIN_ALLOWED_NUMBER;
    }

    public set MAX_ALLOWED_NUMBER(value: number) {
        if (value <= 0) throw new Error('MAX_ALLOWED_NUMBER must be greater than 0')
        this._MAX_ALLOWED_NUMBER = value;
    }

    public get MAX_ALLOWED_NUMBER() {
        return this._MAX_ALLOWED_NUMBER;
    }

    private calculateResult({startValue, operators, complexity, hiddenNumbers}: {
        startValue: number,
        operators: Operator[],
        complexity: number,
        hiddenNumbers: number[]
    }): number {
        let calculatedResult = startValue;
        for (let i = 0; i < complexity; i++) {
            calculatedResult = operators[i].resolve(calculatedResult, hiddenNumbers[i]);
        }
        return calculatedResult;
    }

    generateTask({complexity, allowedOperators}: GenerateTaskParams): Task {
        const startValue = this.getRandomInteger(this.MIN_ALLOWED_NUMBER, this.MAX_ALLOWED_NUMBER)
        const operators = this.generateRandomOperators(complexity, allowedOperators)
        const hiddenNumbers = this.generateRandomNumbers(complexity)

        operators.sort((a, b) => b.priority - a.priority);
        const result = this.calculateResult({startValue, operators, complexity, hiddenNumbers})

        return {
            startValue,
            operators,
            answer: hiddenNumbers,
            result,
            complexity,
        };
    }
}

export default TaskGenerator;