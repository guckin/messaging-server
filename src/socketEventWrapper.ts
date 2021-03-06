import {
    BuiltInEventCallback,
    EventEmitter,
    PassBackEventCallback
} from './interfaces/eventemitter';

export class SocketEventWrapper implements EventEmitter {

    private registeredPassBackEventsMap = new Map<string, PassBackEventCallback<any>>();

    constructor(
        private readonly io: any
    ) {}

    private onConnectCallback: BuiltInEventCallback = () => undefined;
    private onDisconnectCallback: BuiltInEventCallback = () => undefined;

    attachEvents(): void {
        console.log('hey');
        this.io.on('connect', (socket: any) => {
            socket.join('main');
            this.attachConnectEvent(socket);
            this.attachedRegisteredEventsTo(socket);
            this.attachDisconnectEventTo(socket);
        });
    }

    onConnect(cb: BuiltInEventCallback): void {
        this.onConnectCallback = cb;
    }

    onDisconnect(cb: BuiltInEventCallback): void {
        this.onDisconnectCallback = cb;
    }

    registerPassBackEvent<T>(name: string, cb: PassBackEventCallback<T>): void {
        this.registeredPassBackEventsMap.set(name, cb);
    }

    private attachConnectEvent(socket: any) {
        socket.emit('clientConnected', this.onConnectCallback());
    }

    private attachedRegisteredEventsTo(socket: any) {
        this.registeredPassBackEventsMap
            .forEach((cb: PassBackEventCallback<any>, name: string) => {
                socket.on(name, (data: any) => {
                    const msgData = cb(data);
                    console.log('emitting message in main - message: ', cb(data).content);
                    this.io.in('main').emit(name, msgData);
                });
            });
    }

    private attachDisconnectEventTo(socket: any) {
        socket.on('disconnect', () => {
            socket.emit('clientDisconnected', this.onDisconnectCallback());
        });
    }
}
