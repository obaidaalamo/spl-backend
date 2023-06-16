import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { addUser, getUsers } from '../users/users';

type Message = {
  msg: String;
  content: String;
};

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      const users = getUsers();
      const result = users.find((a) => a.name === socket.handshake.query[0]);

      if (!result) {
        this.server.emit('onMessage', {
          msg: 'New User',
          content: ' is Online',
          user: socket.handshake.query[0],
        });
        addUser(socket.id, socket.handshake.query[0]);
      }
      console.log('connected');
    });
  }
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: Message) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}
