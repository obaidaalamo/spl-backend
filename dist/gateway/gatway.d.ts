import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
type Message = {
    msg: String;
    content: String;
};
export declare class MyGateway implements OnModuleInit {
    server: Server;
    onModuleInit(): void;
    onNewMessage(body: Message): void;
}
export {};
