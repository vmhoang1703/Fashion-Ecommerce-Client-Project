import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CollectionService } from 'src/app/services/collection.service';
import { ProductService } from 'src/app/services/product.service';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css'],
})
export class ShowProductComponent implements OnInit {
  product!: Product;
  collectionTitle!: string;
  @ViewChild('nav') slider!: NgImageSliderComponent;
  imageObject: Array<object> = [];

  constructor(
    private productService: ProductService,
    private collectionService: CollectionService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (response: any) => {
          this.product = response.product;
          const collectionId = this.product.collectionId;
          if (collectionId) {
            this.collectionService.getCollectionById(collectionId).subscribe(
              (response: any) => {
                this.collectionTitle = response.collection.title;

                this.imageObject = this.product.imageUrls.map((imageUrl) => ({
                  image: imageUrl,
                  thumbImage: imageUrl,
                  alt: this.product.name,
                  title: this.product.name,
                }));
              },
              (error) => {
                alert('Không tìm thấy bộ sưu tập');
              }
            );
          } else {
            alert('Không tìm thấy bộ sưu tập');
          }
        },
        (error) => {
          alert('Không tìm thấy sản phẩm');
        }
      );
    } else {
      alert('Không tìm thấy sản phẩm');
    }
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
}
