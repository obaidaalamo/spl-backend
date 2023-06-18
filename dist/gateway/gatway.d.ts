import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
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
export declare class MyGateway implements OnModuleInit {
    server: Server;
    onModuleInit(): void;
    onNewMessage(body: Message): void;
    onNewUser(body: Message): void;
    onStartGame(body: Round): Promise<void>;
}
export {};
