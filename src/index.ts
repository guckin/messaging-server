import {createServer} from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as SocketIO from 'socket.io';
import {MessagePersistence} from './messagePersistence';
import {MessagingSocketService} from './messagingSocketService';

const app = express();
const messagePersistence = new MessagePersistence();

app.use(cors());

const server = createServer(app);
const io = SocketIO(server);

const socketService = new MessagingSocketService(io, messagePersistence);
socketService.init();

export default server;

