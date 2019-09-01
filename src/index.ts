// import {createServer} from 'http';
// import * as express from 'express';
// import * as SocketIO from 'socket.io';
// import {Socket} from 'socket.io';
//
// const app = express();
// const server = createServer(app);
// const io = SocketIO(server);
// const messageLog = new Map<string, any[]>();
//
//
// io.on('connect', (socket: Socket) => {
//
//     socket.on('getRoomLog', room => {
//         socket.emit('roomLogData', messageLog.get(room));
//     });
//
//     socket.on('joinRoom', room => {
//         socket.join(room);
//     });
//
//     socket.on('leaveRoom', room => {
//         socket.leave(room);
//     });
//
//     socket.on('broadcastMessage', message => {
//        io.in(message.room).emit('message', message);
//        messageLog.get(message.room).push(message);
//     });
// });
//
//
//

