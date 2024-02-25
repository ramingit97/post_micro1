import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './repo/post.repository';
import { RmqService } from 'src/rmq/rmq.service';
import { RmqModule } from 'src/rmq/rmq.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
        TypeOrmModule.forFeature([PostEntity]),
        RmqModule
    ],
    providers: [PostService,PostRepository,RmqService],
    controllers:[PostController]
})
export class PostModule {}
