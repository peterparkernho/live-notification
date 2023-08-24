declare class Logger {
    static instance?: typeof console;
    static prefix(): string;
    static setInstance(inst?: typeof console): void;
    static error: (...rest: any) => void;
    static info: (...rest: any) => void;
    static debug: (...rest: any) => void;
    static warn: (...rest: any) => void;
    static log: (...rest: any) => void;
}
export default Logger;
