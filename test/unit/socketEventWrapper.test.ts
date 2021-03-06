import {SocketEventWrapper} from '../../src/socketEventWrapper';
import {SocketMock} from '../mocks/socket.mock';
import {IOMock} from '../mocks/io.mock';

describe.skip('SocketEventWrapper', () => {
    let socket: SocketMock;
    let io: IOMock;
    let socketEventWrapper: SocketEventWrapper;

    beforeEach(() => {
        socket = new SocketMock();
        io = new IOMock(socket);
        socketEventWrapper = new SocketEventWrapper(io);
    });

    it('After the events are attached it registers the connect event on the io object ', () => {
        attachEvents();

        expectConnectEventRegisteredOnIOEventToBe(true);
    });

    it('Before the events are attached it does not register the connect event', () => {
        expectConnectEventRegisteredOnIOEventToBe(false);
    });

    it('sets the correct data on connect emit', () => {
        setConnectValue('foo');

        expectConnectedValueToBe('foo');
    });

    it('emits the correct data for disconnect', () => {
        setDisconnectValue('bar');

        expectDisconnectedValueToBe('bar');
    });

    it('emits data back on registered events', () => {
        const eventsToRegister: [string, (data: string) => any][] = [
            ['foo', (data: any) => 'bar'],
            ['baz', (data: any) => data ]
        ];

        registerEvents(eventsToRegister);

        eventsToRegister.forEach((event) => {
            expectEmittedEventToReturnValue(event[0], event[1](socket.callCallbackWith));
        });
    });

    function setConnectValue(value: any) {
        socketEventWrapper.onConnect(() => {
            return value;
        });
    }

    function setDisconnectValue(value: any) {
        socketEventWrapper.onDisconnect(() => {
           return value;
        });
    }

    function expectConnectedValueToBe(value: any) {
        attachEvents();
        expect(emittedValue('clientConnected')).toEqual(value);
    }

    function expectDisconnectedValueToBe(value: any) {
        attachEvents();
        expect(emittedValue('clientDisconnected')).toEqual(value);
    }

    function expectConnectEventRegisteredOnIOEventToBe(bool: boolean) {
        expect(io.lastOnNameRegistered === 'connect').toBe(bool);
    }

    function attachEvents() {
        socketEventWrapper.attachEvents();
    }

    function registerEvents(events: [string, (data: string) => any][]) {
        events.forEach((event) => {
            socketEventWrapper.registerPassBackEvent(...event);
        });
        attachEvents();
    }

    function expectEmittedEventToReturnValue(eventName: string, value: any) {
        expect(emittedValue(eventName)).toEqual(value);
    }

    function emittedValue(key: string): any {
        return socket.emitted.get(key);
    }
});
