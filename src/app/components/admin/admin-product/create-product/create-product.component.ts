import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { FileUpload } from 'src/app/models/file-upload';
import { Product } from 'src/app/models/product';
import { CollectionService } from 'src/app/services/collection.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  createProductForm!: FormGroup;
  collections: Collection[] = [];
  // mainImage!: File;
  // images!: File[];
  // currentMainImageUpload!: FileUpload;
  // currentimagesUpload!: FileUpload[];
  images: File[] = [];
  currentImagesUpload!: FileUpload[];
  public loading = false;

  constructor(
    private collectionService: CollectionService,
    private fb: FormBuilder,
    private uploadService: FileUploadService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
      collectionId: [''],
      imageUrls: [''],
    });
    this.getCollections();
  }

  // onMainImgSelected(event: any) {
  //   this.mainImage = event.target.files[0] as File;
  // }

  // onOtherImgsSelected(event: any) {
  //   this.images = event.target.files ? Array.from(event.target.files) : [];
  // }

  onImagesSelected(event: any) {
    this.images = event.target.files ? Array.from(event.target.files) : [];
  }

  getCollections(): void {
    this.collectionService.getCollections().subscribe((response: any) => {
      this.collections = response.collections;
    });
  }

  createProduct() {
    if (this.createProductForm.valid && Array.isArray(this.images)) {
      this.loading = true;
      const formData = this.createProductForm.value;
      const images: File[] | null = this.images;

      if (images) {
        this.currentImagesUpload = images.map((image) => new FileUpload(image));

        this.uploadService;
        this.uploadService
          .pushFilesToStorage(this.currentImagesUpload)
          .subscribe((downloadImagesUrl) => {
            if (downloadImagesUrl && downloadImagesUrl.length > 0) {
              const productData: Product = {
                _id: '',
                name: formData.name,
                description: formData.description,
                price: formData.price,
                quantity: formData.quantity,
                sold: 0,
                collectionId: formData.collectionId,
                imageUrls: downloadImagesUrl,
                mainImageUrl: downloadImagesUrl[0],
              };

              this.productService.createProduct(productData).subscribe(
                (response) => {
                  this.loading = false;
                  if (response.message === 'Tạo sản phẩm thành công') {
                    alert('Tạo sản phẩm thành công');
                    this.router.navigate(['/admin/products']);
                  } else {
                    alert('Tạo sản phẩm thất bại');
                    // this.createProductForm.reset();
                  }
                },
                (error) => {
                  this.loading = false;
                  alert('Tạo sản phẩm thất bại');
                  // this.createProductForm.reset();
                }
              );
            } else {
              this.loading = false;
              alert('Tạo sản phẩm thất bại');
              // this.createProductForm.reset();
            }
          });
      } else {
        this.loading = false;
        alert('Tạo sản phẩm thất bại');
        // this.createProductForm.reset();
      }
    }
  }
}
