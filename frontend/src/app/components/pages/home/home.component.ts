import { Component } from '@angular/core';
import { Food } from '../../../shared/model/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { SearchComponent } from '../../partials/search/search.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,StarRatingComponent,SearchComponent,NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods: Food[] = [];
  constructor(private foodservice: FoodService,activatedRoute:ActivatedRoute) {
    let foodsObservalbe:Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
  if (params.searchTerm) {
    foodsObservalbe = this.foodservice.getAllFoodsBySearchTerm(params.searchTerm);
  } else {
    foodsObservalbe = this.foodservice.getAllFoods();
  }

  foodsObservalbe.subscribe((serverFoods) => {
    this.foods = serverFoods;
  })
});

}
 
  }
  

