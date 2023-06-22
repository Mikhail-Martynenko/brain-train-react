// 1. eval использовать запрещено

// eval('13 * 54 * 72 === 84240')

// 2. Если eval использовать нельзя, то нужно использовать объекты ответов и интерфейсы
export enum OperatorSymbol {
    PLUS,
    MINUS,
    MULTIPLY,
    DIVIDE,
    // POW
}

export const ALLOWED_OPERATORS: Operator[] = [
    {
        symbol: OperatorSymbol.PLUS,
        label: "Суммирование",
        displaySign: '+',
        checked: false,
        priority: 12,
        resolve: (a, b) => a + b,
    },
    {
        symbol: OperatorSymbol.MINUS,
        label: "Разность",
        displaySign: '-',
        checked: false,
        priority: 12,
        resolve: (a, b) => a - b,
    },
    {
        symbol: OperatorSymbol.MULTIPLY,
        label: "Умножение",
        displaySign: '*',
        checked: false,
        priority: 13,
        resolve: (a, b) => a * b,
    },
    {
        symbol: OperatorSymbol.DIVIDE,
        label: "Деление",
        displaySign: '/',
        checked: false,
        priority: 13,
        resolve: (a, b) => a / b,
        validate: (a, b) => b !== 0,
    },
];

export interface Operator {
    symbol: OperatorSymbol;
    label: string;
    displaySign: string;
    checked: boolean,
    priority: number,

    resolve(left: number, right: number): number;

    validate?(left: number, right: number): boolean;
}

export interface Task {
    startValue: number;
    operators: Operator[];
    answer: number[];
    result: number;
    complexity:number
}

export interface GenerateTaskParams {
    complexity: number;
    allowedOperators: Operator[];
}

export interface Generator {
    generateTask(params: GenerateTaskParams): Task;

    MIN_ALLOWED_NUMBER: number;
    MAX_ALLOWED_NUMBER: number;
}

export interface Resolver {
    checkTask(task: Task): boolean;
}

export interface Statistics {
    sessions: Session[];
}

export interface Config {
    level: number;
}

export interface Session {
    id: string;
    startTime: Date;
    endTime: Date | null;
    score: number;
    missed: number;
    timer: number
}

export interface Game {
    statistics: Statistics;
    config: Config;
    session: Session;
    generator: Generator;
    resolver: Resolver;
}

// theme,
// locale,
// language,
// timeFormat,
// dateFormat,
// numberFormat,
// currencyFormat,
// currencySymbol,
// currencyDecimalPlaces,
// currencyDecimalSeparator,
// currencyGroupSeparator,
// currencyNegativePattern,
// events,


// (() => {
//     const game = useGame();
//
//     checkbox.onClick((e) => {
//         game.events.dispatch(Events.ADD_OPERATOR, operator, e);
//     });
// })();

// const MODS = [
//     (game: Game) => {
//         game.config.ALLOWED_OPERATORS.push({
//             symbol: OperatorSymbol.MAGIC,
//             displaySign: 'O_o',
//             resolve: (a, b) => (a * b) >> 32,
//         });
//
//         game.events.on(game.events.knownEvent.ADD_OPERATOR, (operator: Operator) => {
//             game.config.complexity += 1;
//         });
//     },
// ];

/* Что нужно сделать:

1. Расширить интерфейс Operator всеми необходимыми для работы данными
2. Расширить объект ALLOWED_OPERATORS, заполнить все методы, кроме возведения в степень

2.1 Сложить все сущности и классы в папку Domain

3. Реализовать приложение

3.1 Реализовать поддержку порядка вычисления

3.2 Реализовать тесты на игровой движок

3.3 Реализовать плагин (this.$game)
3.4 Реализовать useGame();

4. Добавить функционал возведения в степень с помощью расширения ALLOWED_OPERATORS

*/