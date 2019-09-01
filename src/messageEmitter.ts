import {Server, Socket} from 'socket.io';
import {Room} from './types/room';
import {Message} from './types/message';


export class MessageEmitter {

    constructor(
        private readonly socket: Socket,
        private readonly io: Server
    ) {}

    emitMessage(message: Message) {
        this.io.in(message.room).emit('message', message);
    }

}
