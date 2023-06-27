import {makeAutoObservable} from "mobx";
import CurrentSession from "../domain/session";
import {createContext} from "react";

class SessionStoreImpl extends CurrentSession {
    constructor(id: string, startTime: Date, endTime: Date | null, score: number, missed: number, timer: number) {
        super(id, startTime, endTime, score, missed, timer);
        makeAutoObservable(this)
    }
}

export const SessionStoreContext = createContext<CurrentSession | null>(null);

export default SessionStoreImpl;
