import { Module } from "@nestjs/common";
import { MyGateway } from "./gatway";

@Module({
    providers:[MyGateway]
})
export class GatewayModule {}