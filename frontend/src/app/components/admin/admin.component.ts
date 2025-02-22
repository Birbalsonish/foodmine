import { Component, NgModule } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/model/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Food } from '../../shared/model/food';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  foods: Food[] = []; // Stores the list of foods
  selectedFood: Food | null = null; // Stores the food being edited

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFoods();
  }

  //  Load foods from backend
  loadFoods() {
    this.productService.getAllFoods().subscribe({
      next: (data) => {
        console.log('Fetched foods:', data);
        this.foods = data;
      },
      error: (err) => console.error('Error fetching foods:', err),
    });
  }

  //  Open edit form
  editFood(food: Food) {
    this.selectedFood = { ...food }; // Copy food data to avoid direct changes
  }

  //  Update food in backend
  updateFood(food: Food) {
    this.productService.updateProduct(food.id, food).subscribe({
      next: (updatedFood) => {
        console.log('Product updated:', updatedFood);
        this.loadFoods(); // Refresh list
      },
      error: (err) => console.error('Error updating product:', err),
    });
  }
    
  }




