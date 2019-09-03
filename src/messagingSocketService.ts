import * as SocketIO from 'socket.io';
import {Events} from './types/events';
import {Room} from './types/room';
import {Message} from './types/message';
import {MessagePersistence} from './messagePersistence';


export class MessagingSocketService {

    constructor(
        private readonly io: SocketIO.Server,
        private readonly messagePersistence: MessagePersistence
    ) {}

    init() {
        this.io.on('connect', (socket) => {
            console.log('connected');
            this.registerEventsOnSocket(socket);
        });
    }

    private registerEventsOnSocket(socket: SocketIO.Socket) {
        this.registerJoinRoomEvent(socket);
        this.registerLeaveRoomEvent(socket);
        this.registerOnMessageEvent(socket);
    }

    private registerJoinRoomEvent(socket: SocketIO.Socket) {
        socket.on(Events.JoinRoom, (room: Room) => {
            console.log('Joined room: ', room);
            socket.join(room);
        });
    }

    private registerLeaveRoomEvent(socket: SocketIO.Socket) {
        socket.on(Events.LeaveRoom, (room: Room) => {
            console.log('Left room: ', room);
            socket.leave(room);
        });
    }

    private registerOnMessageEvent(socket: SocketIO.Socket) {
        socket.on(Events.Message, (message: Message) => {
            console.log('Message: ', message);
            this.io.in(message.room).emit(Events.Message, message);
            this.messagePersistence.store(message);
        });
    }
}
