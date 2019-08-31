import {MessageService} from '../../src/messageService';
import {Log} from '../../src/interfaces/log';
import {EventEmitter} from '../../src/interfaces/eventemitter';
import {Message} from '../../src/models/message';
import {MessageLog} from '../../src/messageLog';
import {MockSocketEventWrapper} from '../mocks/socketEventWrapper.mock';

describe('MessageService', () => {

    let log: Log<Message>;
    let socketEventWrapper: EventEmitter;
    let messageService: MessageService;
    let message: Message;

    beforeEach(() => {
        message = {
            author: 'foo',
            date: 'bar',
            content: 'baz'
        };
        log = new MessageLog(1);
        socketEventWrapper = new MockSocketEventWrapper(message);
        messageService = new MessageService(log, socketEventWrapper);
    });

    it('Sends the correct log on connect ', function () {
        messageService.setup();
        expect(log.toArray()).toEqual([message]);
    });

    it('Handles with the correct event name', () => {
        messageService.setup();
        expect((socketEventWrapper as any).eventName).toEqual('message');
    });

});
