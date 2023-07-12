import {makeObservable, observable} from "mobx";
import CurrentSession from "../domain/session";

class SessionStoreImpl extends CurrentSession {
    constructor(
        id?: string,
        startTime?: Date,
        endTime?: Date | null,
        score?: number,
        missed?: number,
        timer?: number
    ) {
        super(
            id || "",
            startTime || new Date(),
            endTime || null,
            score || 0,
            missed || 0,
            timer || 0
        );
        makeObservable(this, {
            id: observable,
            startTime: observable,
            endTime: observable,
            score: observable,
            miss: observable,
            timer: observable,
        });
    }
}

export default SessionStoreImpl;
