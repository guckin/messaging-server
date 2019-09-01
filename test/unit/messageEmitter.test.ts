import {getIoMock, getSocketMock} from './mockGenerators';

import {MessageEmitter} from '../../src/messageEmitter';
import {Server} from 'socket.io';
import {Message} from '../../src/types/message';

describe(MessageEmitter, () => {

    let messageEmitter: MessageEmitter;
    let mockSocket: any;
    let mockIO: Server;
    let innerMock: any;

    beforeEach(() => {
        mockSocket = getSocketMock() as any;
        innerMock = {emit: jest.fn()};
        mockIO = getIoMock(innerMock) as any;
        messageEmitter = new MessageEmitter(mockSocket, mockIO);
    });

    test('emits a message to a room', () => {
        const message = {
            author: 'author',
            content: 'content',
            date: 'date',
            room: 'room'
        };
        messageEmitter.emitMessage(message);

        expectMessageEmitted(message);
    });

    function expectSocketToBeCalledWith(methodName: string, ...values: any[]) {
        expect(mockSocket[methodName].mock.calls[0]).toEqual(values);
    }

    function expectMessageEmitted(message: Message) {
        expect(innerMock.emit.mock.calls[0]).toEqual(['message', message]);
    }

});
