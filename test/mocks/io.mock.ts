import {SocketMock} from './socket.mock';

export class IOMock {

    lastOnNameRegistered: string;

    constructor(private socket: SocketMock) {}

    on(name: string, cb: any) {
        this.lastOnNameRegistered = name;
        cb(this.socket);
    }

    in() {
        return {
            emit: () => {}
        };
    }
}
