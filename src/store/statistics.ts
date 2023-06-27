import {makeAutoObservable, makeObservable, observable} from 'mobx';
import StatisticsGame from '../domain/statisticsGame';
import {Session} from "../domain/domain";
import {createContext} from "react";

class ReactiveStatisticsGame extends StatisticsGame {
    constructor() {
            super();
            makeObservable(this, {
                statistics: observable,
                getLastSession: observable.ref,
                getAccuracy: observable,
            });
    }

    startSession(session: Session) {
        super.startSession(session)
    }

    getAccuracy(): number {
        return super.getAccuracy();
    }
}

export const StatisticsGameContext = createContext<StatisticsGame | null>(null);

export default ReactiveStatisticsGame;
