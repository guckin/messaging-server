import {Socket} from 'socket.io';
import {Events, EventCallback} from './types/events';

export class EventHandler {

    constructor(
        private readonly socket: Socket,
    ) {}

    onGetRoomLog(cb: EventCallback) {
        this.socket.on(Events.GetRoomLog, cb);
    }

    onJoinRoom(cb: EventCallback) {
        this.socket.on(Events.JoinRoom, cb);
    }

    onLeaveRoom(cb: EventCallback) {
        this.socket.on(Events.LeaveRoom, cb);
    }

    onMessage(cb: EventCallback) {
        this.socket.on(Events.Message, cb);
    }

}
