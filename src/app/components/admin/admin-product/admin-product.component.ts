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

  deleteProduct(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productsService.deleteProduct(id).subscribe(
        (response) => {
          if (response.message === 'Xóa sản phẩm thành công') {
            alert('Xóa sản phẩm thành công!');
            this.getProducts();
          } else {
            console.log(response);
            alert('Xóa sản phẩm thất bại!');
          }
        },
        (error) => {
          console.log(error);
          alert('Xóa sản phẩm thất bại!');
        }
      );
    }
  }
}
