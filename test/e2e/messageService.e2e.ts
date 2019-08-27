import {SocketClient} from './client';
import {Message} from '../../src/models/message';

describe('MessageService e2e', () => {

    let client: SocketClient;

    beforeEach(() => {
        client = setupNewClient();
    });

    afterEach(() => {
        client.close();
    });

    it('can receive a message',  async () => {
        const message: Message = {
            author: 'me',
            content: 'Hello World',
            date: '01/01/1970'
        };
        client.sendMessage(message);

        await sleep(3000);

    });

    function setupNewClient(): SocketClient {
        const newClient = new SocketClient(`http://localhost:${process.env.PORT}`);
        newClient.initSocket();
        newClient
            .onMessage()
            .subscribe((message: Message) => {
                console.log(message.content);
            });
        return newClient;
    }

    function sleep(ms: number) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
});
