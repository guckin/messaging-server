import {Socket} from 'socket.io';

export function getSocketMock(): Socket {
    return {
        on: jest.fn(),
        join: jest.fn(),
        leave: jest.fn()
    } as any;
}
