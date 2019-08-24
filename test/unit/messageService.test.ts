import {Server} from "http";
import * as SocketIO from "socket.io";
import {MessageService} from "../../src/messageService";

describe('MessageService', () => {

    // i dont know
    let portSpyValue: number;
    let onCalled: boolean;

    let actualPortValue: number;
    let mockServer: Server;
    let mockIO: SocketIO.Server;
    let messageService: MessageService;


    beforeEach(() => {
        actualPortValue = 0;
        portSpyValue = null;
        onCalled = null;
        messageService = null
    });

    test('listens on the given port', ()=> {
        initMessageServiceWithPortAs(42);
        expectPortValueToEqual(42);
    });

    class MockServer {
        listen(port: number) {
            portSpyValue = port;
        }
    }

    class MockIO {
        on(event: string, cb: (socket: any) => void) {
            // TODO test this some how
        }
    }

    function initMessageService() {
        mockServer = new MockServer() as any;
        mockIO = new MockIO() as any;
        messageService = new MessageService(mockServer, mockIO, actualPortValue);
        messageService.init()
    }

    function initMessageServiceWithPortAs(newPortValue: number){
        actualPortValue = newPortValue;
        initMessageService();
    }

    function expectPortValueToEqual(expectedPortValue: number) {
        expect(portSpyValue).toEqual(expectedPortValue);
    }
});
