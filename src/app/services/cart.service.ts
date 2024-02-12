import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: { product: Product; quantityBuy: number }[] = [];

  constructor() {}

  addToCart(product: Product, inputQuantity: number) {
    let found = false;

    this.items.forEach((item) => {
      if (product._id === item.product._id) {
        item.quantityBuy += inputQuantity;
        found = true;
      }
    });

    if (!found) {
      this.items.push({ product, quantityBuy: inputQuantity }); 
    }

    console.log(this.items);
  }
  

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
