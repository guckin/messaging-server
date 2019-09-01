import {Socket} from 'socket.io';

export type Room = string;

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
