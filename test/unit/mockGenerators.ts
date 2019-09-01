import {Socket} from 'socket.io';

export function getSocketMock(): Socket {
    return {
        on: jest.fn()
    } as any;
}
