import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Order } from '../../../shared/model/order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { TitleComponent } from '../../partials/title/title.component'
import { CommonModule } from '@angular/common';
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';


@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [TitleComponent,CommonModule,OrderItemListComponent,ReactiveFormsModule,PaypalButtonComponent],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  order:Order = new Order();
  constructor(orderService: OrderService, router: Router) { 
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error:() => {
        router.navigateByUrl('/chekcout');
      }
    })

 }

  ngOnInit(): void {
  }

}
