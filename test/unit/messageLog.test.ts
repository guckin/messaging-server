import {MessageLog} from '../../src/messageLog';
import {Message} from '../../src/models/message';

describe('MessageLog', () => {

    let messageLog: MessageLog;

    beforeEach(() => {
        messageLog = new MessageLog(5);
    });

    it('does not grow bigger than allotted size', () => {
        setLogSize(4);
        pushNumberOfMessages(5);

        expectLogLengthToBe(4);
    });

    it('preservers messages', () => {
        const messages = [
            newMessage({content: '1'}),
            newMessage({content: '2'})
        ];

        pushMessages(...messages);

        expectMessagesToEqual(messages);
    });

    function pushMessages(...messages: Message[]) {
        messages.forEach(message => {
            messageLog.push(message);
        });
    }

    function setLogSize(size: number) {
        messageLog = new MessageLog(size);
    }

    function pushNumberOfMessages(amount: number) {
        [...Array(amount)].forEach(() => {
            messageLog.push(newMessage());
        });
    }

    function newMessage(overrides: Partial<Message> = {}): Message {
        return Object.assign(
            {
                content: '',
                author: '',
                date: ''
            },
            overrides
        );
    }

    function expectLogLengthToBe(size: number) {
        expect(messageLog.toArray().length).toEqual(size);
    }

    function expectMessagesToEqual(messages: Message[]) {
        expect(messageLog.toArray()).toEqual(messages);
    }

});
