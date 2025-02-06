import { Food } from "./food";

export class Cartitems{
    constructor(public food:Food){ }
    quantity:number = 1 ;
    price: number = this.food.price;
}