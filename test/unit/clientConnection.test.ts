import {getSocketMock} from './mockGenerators';

import {ClientConnection} from '../../src/clientConnection';
import {Room} from '../../src/types/room';

describe(ClientConnection, () => {

    let clientConnection: ClientConnection;
    let mockSocket: any;

    beforeEach(() => {
        mockSocket = getSocketMock() as any;
        clientConnection = new ClientConnection(mockSocket);
    });

    it('joins rooms', () => {
        const room = getRoom('test');
        clientConnection.joinRoom(room);

        expectSocketToBeCalledWith('join', room);
    });

    it('leaves rooms', () => {
        const room = getRoom('test');
        clientConnection.leaveRoom(room);

        expectSocketToBeCalledWith('leave', room);
    });

    function expectSocketToBeCalledWith(methodName: string, ...values: any[]) {
        expect(mockSocket[methodName].mock.calls[0]).toEqual(values);
    }

    function getRoom(name: string): Room {
        return name;
    }

});
