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
  mainImage!: File;
  otherImages!: File[];
  collections: Collection[] = [];
  currentMainImageUpload!: FileUpload;
  currentOtherImagesUpload!: FileUpload[];

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
      mainImageUrl: [''],
      otherImageUrls: [''],
    });
    this.getCollections();
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

  createProduct() {
    if (
      this.createProductForm.valid &&
      this.mainImage &&
      Array.isArray(this.otherImages)
    ) {
      const formData = this.createProductForm.value;
      const mainImage: File | null = this.mainImage;
      const otherImages: File[] | null = this.otherImages;

      if (mainImage && otherImages) {
        this.currentMainImageUpload = new FileUpload(mainImage);
        this.currentOtherImagesUpload = otherImages.map(
          (image) => new FileUpload(image)
        );

        this.uploadService
          .pushFileToStorage(this.currentMainImageUpload)
          .subscribe((downloadMainImgURL) => {
            if (downloadMainImgURL) {
              this.uploadService
                .pushFilesToStorage(this.currentOtherImagesUpload)
                .subscribe((downloadOtherImgsURLs) => {
                  if (
                    downloadOtherImgsURLs &&
                    downloadOtherImgsURLs.length > 0
                  ) {
                    const productData: Product = {
                      _id: '',
                      name: formData.name,
                      description: formData.description,
                      price: formData.price,
                      quantity: formData.quantity,
                      collectionId: formData.collectionId,
                      mainImageUrl: downloadMainImgURL,
                      otherImageUrls: downloadOtherImgsURLs,
                    };

                    this.productService
                      .createProduct(productData)
                      .subscribe((response) => {
                        if (response.message === 'Tạo sản phẩm thành công') {
                          alert('Tạo sản phẩm thành công');
                          this.router.navigate(['/admin/products']);
                        } else {
                          alert('Tạo sản phẩm thất bại');
                          this.createProductForm.reset();
                        }
                      });
                  }
                });
            }
          });
      }
    } else {
      console.error('Invalid form data or otherImages is not an array');
    }
  }
}
