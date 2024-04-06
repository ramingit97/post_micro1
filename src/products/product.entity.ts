import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
import { IProduct } from './product.interface';
import { IsNumber, IsString } from 'class-validator';


@Entity('product')
export class ProductEntity implements IProduct {

    @PrimaryGeneratedColumn()
    id:number;

    @IsString()
    name:string;

    @Column()
    price:number;

    @Column()
    quantity:number;

    constructor(post:IProduct){
        if(post){
            Object.assign(this,post);
        }
    }
  
}
