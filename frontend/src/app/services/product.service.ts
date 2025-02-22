import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../shared/model/food';

const BASE_URL = 'http://localhost:5000/api/foods';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(BASE_URL);
  }

  updateProduct(id: string, food: Food): Observable<Food> {
    return this.http.put<Food>(`${BASE_URL}/${id}`, food);
  }
}

