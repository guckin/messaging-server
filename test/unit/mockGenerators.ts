import {Server, Socket} from 'socket.io';
import {MessagePersistence} from '../../src/messagePersistence';

export function getSocketMock(): any {

    return new class {

        eventMap = new Map<string, (data: any) => void>();

        on = jest.fn((event: string, cb: any) => {
            this.eventMap.set(event, cb);
        });
        join = jest.fn();
        leave =  jest.fn();
        emit = jest.fn();
    } as any;
}

export function getIoMock(inRoomMock: any): Server {
    return new class {
        on = jest.fn((event: string, cb: (socket: Socket) => void) => {
            cb(inRoomMock);
        });
        in = jest.fn().mockReturnValue(inRoomMock);
    } as any;
}

export function getMockPersistence(): MessagePersistence {
    return {
        getMessages: jest.fn(),
        reset: jest.fn(),
        store: jest.fn()
    } as any;
}
