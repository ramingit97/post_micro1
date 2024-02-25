import { DynamicModule, Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

interface RmqModuleOptions{
    name:string
}

@Module({
    imports:[
    ClientsModule.register([
        {
            name: 'rabbit-mq-module',
            transport: Transport.RMQ,
            options: {
            urls: [
                'amqp://rabbitmq:5672',
            ],
            queue: 'response_queue',
            },
        },
        ]),
    ],
    providers:[RmqService],
    exports:[RmqService]
})

export class RmqModule{
    // static register({name}:RmqModuleOptions):DynamicModule{
    //     return {
    //         module:RmqModule,
    //         imports:[
    //             ClientsModule.
    //         ]
    //     }
    // }
}