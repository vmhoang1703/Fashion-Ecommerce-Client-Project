import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { FileUpload } from 'src/app/models/file-upload';
import { Product } from 'src/app/models/product';
import { CollectionService } from 'src/app/services/collection.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product!: Product;
  collections!: Collection[];
  editProductForm!: FormGroup;
  mainImage!: File;
  otherImages!: File[];
  currentMainImageUpload!: FileUpload;
  currentOtherImagesUpload!: FileUpload[];
  public loading = false;
  public showDeleteButton = false;

  constructor(
    private productService: ProductService,
    private collectionService: CollectionService,
    private uploadService: FileUploadService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
      collectionId: [''],
      // mainImageUrl: [''],
      // otherImageUrls: [''],
    });
    this.getCollections();
    this.getProduct();
  }

  onMainImgSelected(event: any) {
    this.mainImage = event.target.files[0] as File;
  }

  onOtherImgsSelected(event: any) {
    this.otherImages = event.target.files ? Array.from(event.target.files) : [];
  }

  getCollections(): void {
    this.collectionService.getCollections().subscribe((response: any) => {
      this.collections = response.collections;
    });
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(
        (response: any) => {
          this.product = response.product;
          this.editProductForm.patchValue({
            name: this.product.name,
            description: this.product.description,
            price: this.product.price,
            quantity: this.product.quantity,
            collectionId: this.product.collectionId,
            // mainImageUrl: this.product.mainImageUrl,
            // otherImageUrls: this.product.otherImageUrls,
          });
        },
        (error) => {
          console.log(error);
          alert('Lấy thông tin sản phẩm thất bại!');
        }
      );
    }
  }

  updateProduct() {
  }
}
