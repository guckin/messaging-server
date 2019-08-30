import {SocketEventWrapper} from '../../src/socketEventWrapper';
import {SocketMock} from '../mocks/socket.mock';
import {IOMock} from '../mocks/io.mock';

describe('SocketEventWrapper', () => {
    let socket: SocketMock;
    let io: IOMock;
    let socketEventWrapper: SocketEventWrapper;

    beforeEach(() => {
        socket = new SocketMock();
        io = new IOMock(socket);
        socketEventWrapper = new SocketEventWrapper(io);
    });

    it('After the events are attached it registers the connect event on the io object ', function () {
        attachEvents();

        expectConnectEventRegisteredOnIOEventToBe(true);
    });

    it('Before the events are attached it does not register the connect event', function () {
        expectConnectEventRegisteredOnIOEventToBe(false);
    });

    it('sets the correct data on connect emit', function () {
        setConnectValue('foo');

        expectConnectedValueToBe('foo');
    });

    it('emits the correct data for disconnect', function () {
        setDisconnectValue('bar');

        expectDisconnectedValueToBe('bar');
    });

    it('emits data back on registered events', function () {
        const eventsToRegister: [string, (data: string) => any][] = [
            ['foo', (data: any) => 'bar'],
            ['baz', (data: any) => data ]
        ];

        registerEvents(eventsToRegister);

        expectRegisteredEventsToBe(eventsToRegister);
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
        expect(socket.emitted.get('clientConnected')).toEqual(value);
    }

    function expectDisconnectedValueToBe(value: any) {
        attachEvents();
        expect(socket.emitted.get('clientDisconnected')).toEqual(value);
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

    function expectRegisteredEventsToBe(events: [string, (data: any) => any][]) {
        expect(socket.registeredEvents).toEqual(new Map(events));
    }
});
