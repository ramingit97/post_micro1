import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('12121212')
    return this.appService.getHello();
  }

  // @MessagePattern('create_post')
  // public async createToken(@Payload() data: any) {
  //   console.log('data',data);
  //   return {
  //     name:"Ramin",
  //     status:true
  //   }
  // } 
}
