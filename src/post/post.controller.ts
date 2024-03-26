import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, Post, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RmqContext, RpcException, TcpContext } from '@nestjs/microservices';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post-create.dto';
import { RmqService } from 'src/rmq/rmq.service';

@Controller('')
export class PostController {
    
    constructor(private postService:PostService,
            private rmqService:RmqService
        ){}

    @UsePipes(ValidationPipe)
    @MessagePattern("create_post")
    async createPost(@Payload() data:PostCreateDto){
        console.log('rrrrrr',data)
        let result = await this.postService.create(data);
        console.log('resutk',result);
        return result;
    }

    // @MessagePattern("all")
    // async findAll(){
    //     // console.log("agent",agent2)
    //     return {all:true};
    // }

    // @EventPattern("orders")
    // async createPost2(@Payload() data:any,@Ctx() context:KafkaContext){
    //     console.log("post222 context",data);
    //     console.log(context.getMessage());
    // }


    @EventPattern("notifications")
    async handleNotifications(@Payload() data:any,@Ctx() context:RmqContext){
        console.log(data,"data");
        this.rmqService.ack(context);
        this.rmqService.send("send_notifications2",{salam:true})
    }




   

}
