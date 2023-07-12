import {makeObservable, observable} from 'mobx';
import GameStatistics from '../domain/gameStatistics';
import {Session} from "../domain/domain";
import {createContext} from "react";

class ReactiveStatisticsGame extends GameStatistics {
    constructor() {
        super();
        makeObservable(this, {
            statistics: observable,
            getLastSession: observable.ref,
            getAccuracy: observable,
        });
    }

    addSession(session: Session) {
        super.addSession(session)
    }

    getAccuracy(): number {
        return super.getAccuracy();
    }
}

export const StatisticsGameContext = createContext<GameStatistics | null>(null);

export default ReactiveStatisticsGame;
