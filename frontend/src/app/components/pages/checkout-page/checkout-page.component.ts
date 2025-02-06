import { Component, NgModule, OnInit } from '@angular/core';
import { Order } from '../../../shared/model/order';
import { CartService } from '../../../services/cart.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormControl} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { MapComponent } from '../../partials/map/map.component';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [TitleComponent,ReactiveFormsModule,CommonModule,OrderItemListComponent,TextInputComponent,MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();

  checkoutForm!: FormGroup;
 
  constructor(cartService:CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private orderService: OrderService,
              private router: Router) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice = cart.totalPrice;
              }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }


  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

 
   

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    
    this.orderService.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse: { error: string | undefined; }) => {
        console.error('Error Response:', errorResponse);
        this.toastrService.error(errorResponse.error, 'Cart');
      }
    })
  }
}

