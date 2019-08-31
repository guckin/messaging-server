import {Server} from 'http';
import {Service} from '../../src/interfaces/service';
import {MessagingServer} from '../../src/messagingServer';

describe('MessageServer', () => {

    let portSpyValue: number;
    let onCalled: boolean;

    let mockServer: Server;
    let messageService: Service;
    let messagingServer: MessagingServer;
    let setUpCalled: boolean;


    beforeEach(() => {
        portSpyValue = null;
        onCalled = null;
        messageService = null;
    });

    it('listens on the given port', () => {
        startServer(42);

        expectPortValueToEqual(42);
    });

    it('It setups up the Message service', () => {
        startServer();

        expectMessageServiceHasBeenSetup();
    });

    class MockServer {
        listen(port: number) {
            portSpyValue = port;
        }
    }

    function initMessageService(port: number) {
        mockServer = new MockServer() as any;
        messageService = new MockMessageService();
        messagingServer = new MessagingServer(mockServer, port, messageService);
    }

    function startServer(newPortValue: number = 0) {
        initMessageService(newPortValue);
        messagingServer.start();
    }

    function expectPortValueToEqual(expectedPortValue: number) {
        expect(portSpyValue).toEqual(expectedPortValue);
    }

    function expectMessageServiceHasBeenSetup() {
        expect(setUpCalled).toEqual(true);
    }

    class MockMessageService implements Service {

        setup(): void {
            setUpCalled = true;
        }
    }
});
