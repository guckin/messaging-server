import {Socket} from 'socket.io';
import {Room} from './types/room';

export class ClientConnection {

    constructor(
        private readonly socket: Socket
    ) {}

    joinRoom(room: Room) {
        this.socket.join(room);
    }

    leaveRoom(room: Room) {
        this.socket.leave(room);
    }
}
