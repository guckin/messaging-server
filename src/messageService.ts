import {Message} from './models/message';
import {Service} from './interfaces/service';
import {Log} from './interfaces/log';
import {EventEmitter} from './interfaces/eventemitter';

export class MessageService implements Service {

    constructor(
        private readonly messageLog: Log<Message>,
        private readonly socketEventWrapper: EventEmitter
    ) {}

    setup() {
        this.socketEventWrapper.onConnect(this.connectHandler());
        this.socketEventWrapper.onDisconnect(this.disconnectHandler());
        this.socketEventWrapper.registerPassBackEvent('message', this.messageHandler());
        this.socketEventWrapper.attachEvents();
    }

    private connectHandler(): () => Message[] {
        return () => {
            console.log('Client Connected');
            return this.messageLog.toArray();
        };
    }

    private messageHandler(): (msg: Message) => Message {
        return (message: Message) => {
            this.messageLog.push(message);
            return message;
        };
    }

    private disconnectHandler(): () => void {
        return () => {
            console.log('Client Disconnected');
        };
    }

}
