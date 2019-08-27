import * as socketIo from 'socket.io-client';
import {Observable} from 'rxjs';
import {Observer} from 'rxjs';
import {Message} from '../../src/models/message';

// TODO: rename to MessageClient
export class SocketClient {
    private socket: SocketIOClient.Socket;

    constructor(private readonly url: string) {}

    initSocket() {
        this.socket = socketIo(this.url);
    }

    close() {
        this.socket.close();
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>((observer: Observer<Message>) => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    sendMessage(message: Message) {
        this.socket.emit('message', message);
    }
}
