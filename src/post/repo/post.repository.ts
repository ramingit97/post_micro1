import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../post.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostRepository{
    constructor(
        @InjectRepository(PostEntity) private userRepo:Repository<PostEntity>
    ){}

    async create(user:PostEntity){
        return await this.userRepo.save(user) 
    }

    async findAll(){
        return await this.userRepo.find();
    }


    async findById(id:number){
        return await this.userRepo.findOne({where:{id}});
    }
}