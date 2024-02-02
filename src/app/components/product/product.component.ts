import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Collection } from './../../models/collection';
import { CollectionService } from 'src/app/services/collection.service';
import { ProductService } from 'src/app/services/product.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { LabelType, Options } from 'ngx-slider-v2';
import { error } from 'jquery';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products!: Product[];
  collections!: Collection[];
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
      sortBy: ['newest'],
      priceRange: [null],
      collections: this.fb.array([]),
      inStock: [false],
      outOfStock: [false],
    });
  }

  onCheckboxChange(e: Event) {
    const collections: FormArray = this.filterForm.get(
      'collections'
    ) as FormArray;

    if ((e.target as HTMLInputElement).checked) {
      collections.push(new FormControl((e.target as HTMLInputElement).value));
    } else {
      let i: number = 0;
      collections.controls.forEach((collection: AbstractControl) => {
        if (
          collection instanceof FormControl &&
          collection.value == (e.target as HTMLInputElement).value
        ) {
          collections.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnInit(): void {
    this.getAllCollections();
    this.getAllProducts();
  }

  getAllCollections(): void {
    this.collectionService.getCollections().subscribe(
      (response) => {
        this.collections = response.collections;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response.products;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChangeFilters() {
    const filters = this.filterForm.value;
    this.productService.filterProduct(filters).subscribe(
      (response) => {
        this.products = response.productsFiltered;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
