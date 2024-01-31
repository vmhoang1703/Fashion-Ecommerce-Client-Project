import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';
import { Product } from 'src/app/models/product';
import { Collection } from './../../models/collection';
import { CollectionService } from 'src/app/services/collection.service';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LabelType, Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-products-by-collection',
  templateUrl: './products-by-collection.component.html',
  styleUrls: ['./products-by-collection.component.css'],
})
export class ProductsByCollectionComponent implements OnInit {
  products!: Product[];
  collection!: Collection;
  filterForm!: FormGroup;
  minValue: number = 0;
  maxValue: number = 5000;

  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value: number, label: LabelType): string => {
      const formattedValue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value * 1000);

      switch (label) {
        case LabelType.Low:
          return formattedValue;
        case LabelType.High:
          return formattedValue;
        default:
          return formattedValue;
      }
    },
  };

  constructor(
    private productService: ProductService,
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      priceRange: [null],
      sortBy: ['newest'],
    });
  }

  ngOnInit(): void {
    this.getCollection();
    this.getProductsByCollection();
  }

  getCollection(): void {
    const collectionId = this.route.snapshot.paramMap.get('id') as string;
    this.collectionService.getCollectionById(collectionId).subscribe(
      (response) => {
        this.collection = response.collection;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductsByCollection(): void {
    const collectionId = this.route.snapshot.paramMap.get('id') as string;
    this.productService.getProductsByCollection(collectionId).subscribe(
      (response) => {
        this.products = response.products;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilters() {
    const filters = this.filterForm.value;
  }
}
