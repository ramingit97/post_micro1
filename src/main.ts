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
  
  await appTcp.listen();

  const httpApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.TCP,
    options: {
      host: 'post-service',
      port: 5000,
    },
  });

  // Запускаем веб-приложение для HTTP
  httpApp.listen(); 
}
bootstrap();
