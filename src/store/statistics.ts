import {makeObservable, observable} from 'mobx';
import GameStatistics from '../domain/gameStatistics';
import {Session} from "../domain/domain";

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

export default ReactiveStatisticsGame;
