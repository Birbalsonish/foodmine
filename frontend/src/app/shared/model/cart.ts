import { Cartitems} from './cartitems';
export class Cart{
  items:Cartitems[] = [];
  totalPrice:number = 0;
  totalCount:number = 0;
}