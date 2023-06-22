class Random {
    public static getRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static pickArrayMember<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

export default Random;