import { Injectable } from '@angular/core';
import { samplefoods } from '../../data';
import { Food } from '../shared/model/food';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_URL } from '../shared/constants/urls';
import { FOODS_BY_SEARCH_URL } from '../shared/constants/urls';
import { FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

getAllFoodsBySearchTerm(searchTerm: string){
  return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

 getAllFoodById(foodId:string):Observable<Food>{
  return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
}
}