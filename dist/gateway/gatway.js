"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const users_1 = require("../users/users");
const generateRandomNumber_1 = require("../utils/generateRandomNumber");
const waitingTime_1 = require("../utils/waitingTime");
const resultData_1 = require("../round/resultData");
let MyGateway = exports.MyGateway = class MyGateway {
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('connected');
        });
    }
    onNewMessage(body) {
        this.server.emit('onMessage', {
            msg: 'New Message',
            content: body,
        });
    }
    onNewUser(body) {
        this.server.emit('onLogin', {
            msg: 'New User',
            content: body,
        });
        (0, users_1.addUser)(body, 1000, 1);
    }
    async onStartGame(body) {
        const robotUsers = [];
        const robot1 = {
            user: 'robot 1',
            points: body.points,
            multiplier: (0, generateRandomNumber_1.generateRandomBoolean)(),
            speed: body.speed,
        };
        robotUsers.push(robot1);
        const robot2 = {
            user: 'robot 2',
            points: body.points,
            multiplier: (0, generateRandomNumber_1.generateRandomBoolean)(),
            speed: body.speed,
        };
        robotUsers.push(robot2);
        const robot3 = {
            user: 'robot 3',
            points: body.points,
            multiplier: (0, generateRandomNumber_1.generateRandomBoolean)(),
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
            await (0, waitingTime_1.waitingTime)(parseInt(1000 / body.speed + ''));
            if (counter > (0, generateRandomNumber_1.generateRandomNumber)(10))
                break;
        } while (true);
        const userStateList = (0, resultData_1.resultData)(robotUsers, counter);
        this.server.emit('onGameEnds', {
            value: userStateList,
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MyGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "onNewMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('newUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "onNewUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('startGame'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "onStartGame", null);
exports.MyGateway = MyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:3000'],
        },
    })
], MyGateway);
//# sourceMappingURL=gatway.js.map