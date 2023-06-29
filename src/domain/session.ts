import { Session } from "./domain";

class CurrentSession implements Session {
    readonly id: string;
    startTime: Date;
    endTime: Date | null;
    score: number;
    miss: number;
    timer: number;

    constructor(
        id: string = Date.now().toString(),
        startTime: Date = new Date(),
        endTime: Date | null = null,
        score: number = 0,
        missed: number = 0,
        timer: number = 0
    ) {
        this.id = id;
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
