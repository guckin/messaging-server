import {getIoMock, getSocketMock} from './mockGenerators';

import {MessageEmitter} from '../../src/messageEmitter';
import {Server} from 'socket.io';
import {Message} from '../../src/types/message';

describe(MessageEmitter, () => {

    let messageEmitter: MessageEmitter;
    let mockIO: Server;
    let innerMock: any;

    beforeEach(() => {
        innerMock = {emit: jest.fn()};
        mockIO = getIoMock(innerMock) as any;
        messageEmitter = new MessageEmitter(mockIO);
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

    function expectMessageEmitted(message: Message) {
        expect(innerMock.emit.mock.calls[0]).toEqual(['message', message]);
    }

});
