import {makeAutoObservable} from 'mobx';
import {Task} from '../domain/domain';

export interface TaskStore {
    currentTask: Task | null;
    getCurrentTask: () => Task | null;
    setCurrentTask: (task: Task) => void
}

class TaskStoreImpl implements TaskStore {
    currentTask: Task | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    getCurrentTask() {
        return this.currentTask;
    }

    setCurrentTask(task: Task) {
        this.currentTask = task;
    }
}

export default TaskStoreImpl;
