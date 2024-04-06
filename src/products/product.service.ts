import { Injectable } from '@nestjs/common';
import {  ProductCreateDto} from './dto/product-create.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './repo/product.repository';

@Injectable()
export class ProductService {

    constructor(
            private readonly productRepo:ProductRepository
    ){}


    async create(data:ProductCreateDto){
        const newEntity = await new ProductEntity(data);

        return await this.productRepo.create(newEntity);
    }



}
