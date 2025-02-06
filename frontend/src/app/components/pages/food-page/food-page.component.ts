import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Food } from '../../../shared/model/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule,StarRatingComponent,RouterLink,NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent  {
  food!: Food;

constructor(activatedRoute: ActivatedRoute, foodService: FoodService,
  private cartService:CartService, private router: Router) {
  activatedRoute.params.subscribe((params) => {
    if (params.id) {
      
      foodService.getAllFoodById(params.id).subscribe(serverFood => {
        this.food = serverFood;
      });
    }
  });


}
addToCart(){
  this.cartService.addToCart(this.food);
  this.router.navigateByUrl('/cart-page');
}


}
