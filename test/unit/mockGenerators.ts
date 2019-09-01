import {Server, Socket} from 'socket.io';

export function getSocketMock(): Socket {
    return {
        on: jest.fn(),
        join: jest.fn(),
        leave: jest.fn()
    } as any;
}

export function getIoMock(inRoomMock: any): Server {
    return {
        in: jest.fn().mockReturnValue(inRoomMock)
    } as any;
}
