import {MessagingSocketService} from '../../src/messagingSocketService';
import {getIoMock, getMockPersistence, getSocketMock} from './mockGenerators';
import {Events} from '../../src/types/events';
import {Message} from '../../src/types/message';

describe('MessagingSocketService', () => {
    let messagingSocketService: MessagingSocketService;
    let mockSocket: any;
    let mockSocketIO: any;
    let mockPersistence: any;

    beforeEach(() => {
        mockSocket = getSocketMock();
        mockSocketIO = getIoMock(mockSocket);
        mockPersistence = getMockPersistence();
        messagingSocketService = new MessagingSocketService(mockSocketIO, mockPersistence);
        messagingSocketService.init();
    });

    it('registers the `LeaveRoom` event', () => {
        expectEventWasRegistered(Events.LeaveRoom);
    });

    it('registers the `JoinRoom` event', () => {
        expectEventWasRegistered(Events.JoinRoom);
    });

    it('registers the `Message` event', () => {
        expectEventWasRegistered(Events.Message);
    });

    it('removes the socket connection from the room', () => {
        leaveRoom('room');

        expectLeftRoom('room');
    });

    it('joins the socket connection to the room', () => {
        joinRoom('room');

        expectJoinRoom('room');
    });

    it('sends a message to a room', () => {
        const msg = {
            author: 'I',
            content: 'am',
            date: 'a',
            room: 'message'
        };
        sendMessage(msg);

        expectMessageSent(msg);
    });

    it('save a message to persistence', () => {
        const msg = {
            author: 'I',
            content: 'am',
            date: 'a',
            room: 'message'
        };
        sendMessage(msg);

        expectMessageSavedInPersistence(msg);
    });

    function expectEventWasRegistered(event: Events) {
        expect(mockSocket.eventMap.has(event)).toBeTruthy();
    }

    function expectLeftRoom(room: string) {
        expect(mockSocket.leave.mock.calls[0]).toEqual([room]);
    }

    function expectJoinRoom(room: string) {
        expect(mockSocket.join.mock.calls[0]).toEqual([room]);
    }

    function expectMessageSent(message: Message) {
        expect(mockSocketIO.in.mock.calls[0]).toEqual([message.room]);
        expect(mockSocket.emit.mock.calls[0]).toEqual([Events.Message, message]);
    }

    function expectMessageSavedInPersistence(message: Message) {
        expect(mockPersistence.store.mock.calls[0]).toEqual([message]);
    }

    function leaveRoom(room: string) {
        getEventCallback(Events.LeaveRoom)(room);
    }

    function joinRoom(room: string) {
        getEventCallback(Events.JoinRoom)(room);
    }

    function sendMessage(message: Message) {
        getEventCallback(Events.Message)(message);
    }

    function getEventCallback(event: Events): (eventData: any) => void {
        return mockSocket.eventMap.get(event);
    }
});
