import { Component } from '@angular/core';
import { Cart } from '../../../shared/model/cart';
import { CartService } from '../../../services/cart.service';
import { Cartitems } from '../../../shared/model/cartitems';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [TitleComponent,CommonModule,RouterLink,NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }
   removeFromCart(cartItem:Cartitems){
    this.cartService.removeFromCart(cartItem.food.id);
  }
  changeQuantity(cartItem:Cartitems,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
