import {EventEmitter} from '../../src/interfaces/eventemitter';
import {Message} from '../../src/models/message';

export class MockSocketEventWrapper implements EventEmitter {

    private onConnectEvent: any;
    private onDisconnectEvent: any;
    private messageEvent: any;
    eventName: string;

    constructor(
        private readonly incomingMessage: Message
    ) {
    }

    attachEvents(): void {
        this.onConnectEvent();
        this.messageEvent(this.incomingMessage);
        this.onDisconnectEvent();
    }

    onConnect(cb: () => any): void {
        this.onConnectEvent = cb;
    }

    onDisconnect(cb: () => any): void {
        this.onDisconnectEvent = cb;
    }

    registerPassBackEvent<T>(name: string, cb: (data: (T | undefined)) => T): void {
        this.eventName = name;
        this.messageEvent = cb;
    }

}
