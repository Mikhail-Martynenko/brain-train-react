import {makeAutoObservable} from "mobx";

class CounterStore {
    count: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    increment = () => {
        this.count +=  1;
        console.log(this.count)
    }

    decrement = () => {
        this.count -= 1;
        console.log(this.count)
    }
}

export default CounterStore;