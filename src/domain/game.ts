import {Statistics, Game} from './domain';
import TaskGenerator from "./taskGenerator";
import ResolverImpl from "./resolver";
import CurrentSession from "./session";

export const MAX_DIFFICULTY_LEVEL = 10 as const;

class GameController implements Game {
    statistics: Statistics;
    session: CurrentSession;
    config;
    generator: TaskGenerator;
    resolver: ResolverImpl;

    constructor() {
        this.statistics = {
            sessions: [],
        };

        this.session = new CurrentSession();
        this.generator = new TaskGenerator();
        this.resolver = new ResolverImpl();
        this.config = {level: 1}
    }
}

const game = new GameController()

export default game;
