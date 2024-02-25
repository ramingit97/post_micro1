import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, RmqContext, RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class RmqService{
    constructor(private readonly configService:ConfigService,
        @Inject('rabbit-mq-module') private readonly client: ClientProxy,
        ){

    }

    getOptions(queue:string,noAck:boolean=false):RmqOptions{
        return {
            transport:Transport.RMQ,
            options: {
                urls: ['amqp://rabbitmq:5672'],
                queue,
                noAck,
                persistent:true,
                queueOptions: { durable: true },
            },
        }
    }

    ack(context:RmqContext){
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }

    public send(pattern: string, data: any) {
        return this.client.send(pattern, data).toPromise();
    }
}