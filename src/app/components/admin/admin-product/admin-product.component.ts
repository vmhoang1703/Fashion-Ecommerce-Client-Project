import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { Product } from 'src/app/models/product';
import { CollectionService } from 'src/app/services/collection.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  products: Product[] = [];
  collections: Collection[] = [];
  selectedCollection: string = 'all';

  constructor(
    private collectionService: CollectionService,
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCollections();
  }

  getCollections(): void {
    this.collectionService.getCollections().subscribe((response: any) => {
      this.collections = response.collections;
    });
  }

  getProducts(): void {
    if (this.selectedCollection === 'all') {
      this.productsService.getAllProducts().subscribe((response: any) => {
        this.products = response.products;
      });
    } else {
      this.productsService
        .getProductsByCollection(this.selectedCollection)
        .subscribe((response: any) => {
          this.products = response.products;
        });
    }
  }
}
