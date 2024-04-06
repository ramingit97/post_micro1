import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './repo/product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
@Module({
    imports:[
        TypeOrmModule.forFeature([ProductEntity]),
    ],
    providers: [ProductService,ProductRepository],
    controllers:[ProductController]
})
export class ProductModule {}
