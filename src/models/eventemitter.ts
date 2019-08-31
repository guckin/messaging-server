
export type PassBackEventCallback<T> = (data: T | undefined) => T;
export type BuiltInEventCallback = () => any;


export interface IHandleEvents {
    onConnect(cb: BuiltInEventCallback): void;
    onDisconnect(cb: BuiltInEventCallback): void;
    registerPassBackEvent<T>(name: string, cb: PassBackEventCallback<T>): void;
    attachEvents(): void;
}

