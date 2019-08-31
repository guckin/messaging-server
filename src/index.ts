import {createServer} from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import config from './config';

import {MessageService} from './messageService';
import {MessagingServer} from './messagingServer';
import {SocketEventWrapper} from './socketEventWrapper';
import {MessageLog} from './messageLog';

const app = express();
const server = createServer(app);
const io = socketIo(server);
const messageLog = new MessageLog(config.messageLogSize);
const socketEventWrapper = new SocketEventWrapper(io);
const messageService = new MessageService(messageLog, socketEventWrapper);

export const messageServer = new MessagingServer(server, config.port, messageService);
