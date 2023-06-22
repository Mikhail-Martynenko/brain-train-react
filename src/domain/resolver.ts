import {Resolver, Task} from "./domain";

class ResolverImpl implements Resolver {
    validateTask(task: Task): boolean {
        if (task.operators.length !== task.answer.length) return false;
        return true;
    }

    private calculateTaskResult(task: Task): boolean {
        let calculatedResult = task.startValue;
        for (let i = 0; i < task.operators.length; i++) {
            calculatedResult = task.operators[i].resolve(calculatedResult, task.answer[i]);
        }
        return calculatedResult === task.result;
    }

    checkTask(task: Task): boolean {
        return this.validateTask(task) && this.calculateTaskResult(task);
    }
}

export default ResolverImpl;