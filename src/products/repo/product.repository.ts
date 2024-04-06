import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ProductEntity } from "../product.entity";

@Injectable()
export class ProductRepository{
    constructor(
        @InjectRepository(ProductEntity) private productRepo:Repository<ProductEntity>
    ){}

    async create(product:ProductEntity){
        return await this.productRepo.save(product) 
    }

    async findAll(){
        return await this.productRepo.find();
    }


    async findById(id:number){
        return await this.productRepo.findOne({where:{id}});
    }
}