import {EventHandler} from '../../src/eventHandler';
import {getSocketMock} from './mockGenerators';
import {Events} from '../../src/types/events';

describe(EventHandler, () => {

    let eventHandler: EventHandler;
    let mockSocket: any;

    beforeEach(() => {
        mockSocket = getSocketMock() as any;
        eventHandler = new EventHandler(mockSocket);
    });

    test.each([
        Events.GetRoomLog,
        Events.Message,
        Events.LeaveRoom,
        Events.JoinRoom
    ])('Attaches Event handler for %p event', (event) => {
        const handler: () => void = () => null;
        // @ts-ignore
        eventHandler[`on${event}`](handler);

        expectSocketToBeCalledWith(event, handler);
    });

    function expectSocketToBeCalledWith(...values: any[]) {
        expect(mockSocket.on.mock.calls[0]).toEqual(values);
    }

});
