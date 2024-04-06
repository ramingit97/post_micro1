import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, Post, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RmqContext, RpcException, TcpContext } from '@nestjs/microservices';
import { RmqService } from 'src/rmq/rmq.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    
    constructor(
        private productService:ProductService,
    ){}

    // @UsePipes(ValidationPipe)
    @MessagePattern("product.create")
    async createPost(@Payload() data:ProductCreateDto){
        console.log("errorr");
        
        throw new RpcException("product.create.error"); 
        let result = await this.productService.create(data);
        return result;
    }


    @MessagePattern("product.all")
    async findAll(){
        // console.log("agent",agent2)
        return {all:true};
    }


}
