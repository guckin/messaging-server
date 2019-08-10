import {Server} from 'http'
import * as SocketIO from 'socket.io'
import {Message} from "./models/message";

export class MessageService {

    constructor(
        private readonly server: Server,
        private readonly io: SocketIO.Server,
        private readonly port: number
    ) {}

    init() {
        this.listen();
        this.attachEvents();
    }

    private listen() {
        this.server.listen(this.port);
    }

    private attachEvents() {
        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m: Message) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}
