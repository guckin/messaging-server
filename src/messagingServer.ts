import {Server as HttpServer} from 'http';
import {Service} from './interfaces/service';


export class MessagingServer {

    constructor(
        private readonly server: HttpServer,
        private readonly port: number,
        private readonly messageService: Service
    ) {}

    start() {
        this.listen();
        this.messageService.setup();
    }

    private listen() {
        this.server.listen(this.port);
    }

}
