import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  bestSellerProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getBestSellerProducts();
  }

  getBestSellerProducts(): void {
    this.productService.getBestSellerProducts().subscribe(
      (response: any) => {
        this.bestSellerProducts = response.products;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
