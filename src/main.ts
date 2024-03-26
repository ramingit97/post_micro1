import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { RmqService } from './rmq/rmq.service';

async function bootstrap() {
  const appTcp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `consumer-post`,
          brokers: ['kafka-0:9092','kafka-1:9092'],
        },
        consumer: {
          groupId: 'consumer-post',
        },
      },
    },
  );
  // const rmqService = appTcp.get<RmqService>(RmqService);
  // const appRmq = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   rmqService.getOptions('post_queue')
  // );

  await appTcp.listen();
  // await appRmq.listen();
}
bootstrap();
