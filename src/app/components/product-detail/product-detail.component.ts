import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';
import { Collection } from 'src/app/models/collection';
import { Product } from 'src/app/models/product';
import { CollectionService } from 'src/app/services/collection.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  collection!: Collection;
  selectedImageIndex!: number;

  constructor(
    private productService: ProductService,
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const productId = this.route.snapshot.paramMap.get('id') as string;
    this.productService.getProductById(productId).subscribe(
      (response) => {
        this.product = response.product;
        this.collectionService
          .getCollectionById(this.product.collectionId)
          .subscribe(
            (response) => {
              this.collection = response.collection;
            },
            (error) => {
              console.log(error);
            }
          );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }
}
