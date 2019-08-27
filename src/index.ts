import {createServer} from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import {MessageService} from './messageService';

const app = express();
const server = createServer(app);
const io = socketIo(server);

export const messageService = new MessageService(server, io, Number(process.env.PORT) || 8080);

