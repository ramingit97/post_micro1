import { IS_LENGTH, IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class ProductCreateDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsNumber()
    price:number;

    @IsNumber()
    quantity:number;
}