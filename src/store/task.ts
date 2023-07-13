import {action, makeObservable, observable} from 'mobx';
import {Task} from '../domain/domain';

export interface TaskStore {
    currentTask: Task | null;
    getCurrentTask: () => Task | null;
    setCurrentTask: (task: Task) => void
}

class TaskStoreImpl implements TaskStore {
    currentTask: Task = null!;

    constructor() {
        makeObservable(this, {
            currentTask: observable,
            getCurrentTask: action,
            setCurrentTask: action,
        });
    }

    getCurrentTask() {
        return this.currentTask;
    }

    setCurrentTask(task: Task) {
        this.currentTask = task;
    }
}

export default TaskStoreImpl;
