import {MessagePersistence} from '../../src/messagePersistence';
import {Room} from '../../src/types/room';
import {Message} from '../../src/types/message';

describe('MessagePersistence', () => {
    let messagePersistence: MessagePersistence;
    let dataStore: Map<Room, Message[]>;

    beforeEach(() => {
        dataStore = new Map<Room, Message[]>();
        messagePersistence = new MessagePersistence(dataStore);
    });

    it('stores and gets messages', () => {
        const msg: Message = {
            author: 'foo',
            content: 'bar',
            date: 'someDate',
            room: 'room1'
        };
        messagePersistence.store(msg);

        expect(messagePersistence.getMessages('room1')).toEqual([msg]);
    });
});
