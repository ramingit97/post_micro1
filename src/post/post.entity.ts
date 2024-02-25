import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
import { IPost } from './post.interface';


@Entity('post')
export class PostEntity implements IPost {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    description:string;

    constructor(post:IPost){
        if(post){
            this.name = post.name;
            this.description = post.description;
        }
    }
  
}
