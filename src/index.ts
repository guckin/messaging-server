import {createServer} from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import {MessageService} from './messageService';

const app = express();
const server = createServer(app);
const io = socketIo(server);
const messageService = new MessageService(server, io, 80);

export {
    messageService
};

