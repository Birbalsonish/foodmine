import { Component, ElementRef, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Order } from '../../../shared/model/order';
import { ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';

//window.paypal
declare var KhaltiCheckout: any;

@Component({
  selector: 'paypal-button',
  standalone: true,
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent implements OnInit {
  @Input()
  order!: Order;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  payWithKhalti() {
    let config = {
      publicKey: 'test_public_key_xxxx', // Replace with your Khalti Public Key
      productIdentity: '1234567890',
      productName: 'Test Product',
      productUrl: 'http://localhost:4200/', // Change to your actual product URL
      paymentPreference: ['KHALTI'],
      eventHandler: {
        onSuccess: (payload: any) => {
          console.log(payload);
          this.order.paymentId = payload.idx;
          this.orderService.pay(this.order).subscribe({
            next: (orderId: string) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastrService.success('Payment Saved Successfully', 'Success');
            },
            error: (error: any) => {
              this.toastrService.error('Payment Save Failed', 'Error');
            },
          });
        },
        onError: (error: any) => {
          this.toastrService.error('Payment Failed', 'Error');
          console.log(error);
        },
        onClose: () => {
          console.log('Khalti payment widget closed');
        },
      },
    };

    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: this.order.totalPrice * 100 }); // Convert to paisa
  }
}