import {Session} from "./domain";

class CurrentSession implements Session {

    readonly id: string;
    startTime: Date;
    endTime: Date | null;
    score: number;
    miss: number;
    timer: number

    constructor(id: string, startTime: Date, endTime: Date | null, score: number, missed: number, timer: number) {
        this.id = Date.now().toString();
        this.startTime = startTime;
        this.endTime = endTime;
        this.score = score;
        this.miss = missed;
        this.timer = timer;
    }

    addToScore() {
        this.score += 1;
    }

    addToMiss() {
        this.miss += 1;
    }
}

export default CurrentSession;