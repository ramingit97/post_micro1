import { Injectable } from '@nestjs/common';
import { PostCreateDto} from './dto/post-create.dto';
import { PostRepository } from './repo/post.repository';
import { RpcException } from '@nestjs/microservices';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {

    constructor(
            private readonly userRepo:PostRepository
    ){}


    async create({name,description}:PostCreateDto){
        const newEntity = await new PostEntity({
            name,
            description,
        });

        console.log('newEntity',newEntity)


        return await this.userRepo.create(newEntity);
    }

}
