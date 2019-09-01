import {createServer} from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import config from './config';

import {MessageService} from './messageService';
import {MessagingServer} from './messagingServer';
import {SocketEventWrapper} from './socketEventWrapper';
import {MessageLog} from './messageLog';
import {Server, Socket} from 'socket.io';

const app = express();
const server = createServer(app);
// const io = socketIo(server);
// const messageLog = new MessageLog(config.messageLogSize);
// const socketEventWrapper = new SocketEventWrapper(io);
// const messageService = new MessageService(messageLog, socketEventWrapper);
//
// export const messageServer = new MessagingServer(server, config.port, messageService);
const messageLog = new Map<string, any[]>();

io.on('connect', (socket: Socket) => {

    socket.on('getRoomLog', room => {
        socket.emit('roomLogData', messageLog.get(room));
    });

    socket.on('joinRoom', room => {
        socket.join(room);
    });

    socket.on('leaveRoom', room => {
        socket.leave(room);
    });

    socket.on('broadcastMessage', message => {
       io.in(message.room).emit('message', message);
       messageLog.get(message.room).push(message);
    });
});


class MessagingService {
    
    constructor(emitter:, socket) {

    }

    broadcastMessage() {}
}
