import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { addUser, getUsers } from '../users/users';
import {
  generateRandomBoolean,
  generateRandomNumber,
} from 'src/utils/generateRandomNumber';
import { waitingTime } from 'src/utils/waitingTime';
import { resultData } from 'src/round/resultData';

type Message = {
  user: string;
  message: string;
};

type Round = {
  user: string;
  points: number;
  multiplier: number;
  speed: number;
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
      console.log(socket.id);
      console.log('connected');
    });
  }
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: Message) {
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }

  @SubscribeMessage('newUser')
  onNewUser(@MessageBody() body: Message) {
    this.server.emit('onLogin', {
      msg: 'New User',
      content: body,
    });
    addUser(body, 1000, 1);
  }
  @SubscribeMessage('startGame')
  async onStartGame(@MessageBody() body: Round) {
    const robotUsers = [];
    const robot1: Round = {
      user: 'robot 1',
      points: body.points,
      multiplier: generateRandomBoolean(),
      speed: body.speed,
    };
    robotUsers.push(robot1);
    const robot2: Round = {
      user: 'robot 2',
      points: body.points,
      multiplier: generateRandomBoolean(),
      speed: body.speed,
    };
    robotUsers.push(robot2);
    const robot3: Round = {
      user: 'robot 3',
      points: body.points,
      multiplier: generateRandomBoolean(),
      speed: body.speed,
    };
    robotUsers.push(robot3);
    robotUsers.push(body);
    let counter = 0;
    this.server.emit('onGameStarted', {
      meg: 'Game has been started',
      data: robotUsers,
    });
    do {
      counter += 0.1;
      this.server.emit('onChartData', {
        value: counter,
      });
      await waitingTime(parseInt(1000 / body.speed + ''));
      if (counter > generateRandomNumber(10)) break;
    } while (true);
    const userStateList = resultData(robotUsers, counter);
    this.server.emit('onGameEnds', {
      value: userStateList,
    });
  }
}
