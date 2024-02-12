import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  cartForm!: FormGroup;
  productsPrice: number = 0;
  discountPrice: number = 0;
  taxPrice: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private fb: FormBuilder) {}

  ngOnInit(): void { 
    this.cartForm = this.fb.group({
      discountCode: [''],
    });

    this.calculatePrice();
  }

  calculatePrice() {
    this.productsPrice = 0;
    this.totalPrice = 0;
    this.items.forEach((item) => {
      this.productsPrice += item.product.price * item.quantityBuy;
    });
    this.totalPrice = this.productsPrice;
  }

  // updateCart(product: Product) {
  //   const quantityBuy = this.cartForm.get('quantityBuy')?.value;
  //   this.items.forEach((item) => {
  //     if(item.product._id === product._id){
  //       item.quantityBuy = quantityBuy;
  //     }
  //     this.calculatePrice();
  //   })

  //   console.log(this.items);
  // }

  submitCart() {
    let exceededProducts: string[] = [];
    this.items.forEach(item => {
      if (item.product.quantity < item.quantityBuy) {
        exceededProducts.push(item.product.name);
      }
    });

    if (exceededProducts.length > 0) {
      const exceededProductsMessage = exceededProducts.join(', ');
      window.alert(`Số lượng mua của sản phẩm "${exceededProductsMessage}" vượt quá số lượng có sẵn.`);
    }
  }
}
