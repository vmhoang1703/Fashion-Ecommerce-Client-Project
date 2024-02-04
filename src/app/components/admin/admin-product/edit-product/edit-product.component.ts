import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product!: Product;
  collections!: Collection[];
  editProductForm!: FormGroup;
  images!: File[];
  currentImagesUpload!: FileUpload[];
  imageToDelete!: number;
  imagesToDeleteIndex!: number[];
  public loading = false;

  constructor(
    private productService: ProductService,
    private collectionService: CollectionService,
    private uploadService: FileUploadService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
      collectionId: [''],
      imageUrls: [''],
      imagesToDelete: [''],
      size: [''],
      material: [''],
      color: [''],
      brand: ['Phương Fashion'],
    });
    this.imagesToDeleteIndex = [];
    this.getCollections();
    this.getProduct();
  }
  
  onImagesSelected(event: any) {
    this.images = event.target.files ? Array.from(event.target.files) : [];
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
            size: this.product.size,
            material: this.product.material,
            color: this.product.color,
            brand: this.product.brand
          });
        },
        (error) => {
          console.log(error);
          alert('Lấy thông tin sản phẩm thất bại!');
        }
      );
    }
  }

  onImagesDeleteSelected(index: number) {
    if (this.imagesToDeleteIndex.includes(index)) {
      const indexToRemove = this.imagesToDeleteIndex.indexOf(index);
      this.imagesToDeleteIndex.splice(indexToRemove, 1);
    } else {
      this.imagesToDeleteIndex.push(index);
    }

    console.log(this.imagesToDeleteIndex);
  }

  updateProduct() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id') as string;
    const formData = this.editProductForm.value;

    if (id === null) {
      alert('Cập nhật bộ sưu tập thất bại');
      return;
    }

    if (this.images) {
      this.currentImagesUpload = this.images.map(
        (image) => new FileUpload(image)
      );
      this.uploadService
        .pushFilesToStorage(this.currentImagesUpload)
        .subscribe((downloadImagesUrl) => {
          if (downloadImagesUrl && downloadImagesUrl.length > 0) {
            this.imagesToDeleteIndex.sort((a, b) => b - a);
            this.imagesToDeleteIndex.forEach((indexDeleted: number) => {
              this.product.imageUrls.splice(indexDeleted, 1);
            });

            this.product.imageUrls.push(...downloadImagesUrl);

            const productData: Product = {
              _id: id || '',
              name: formData.name || '',
              description: formData.description || '',
              price: formData.price || 0,
              quantity: formData.quantity || 0,
              sold: 0,
              collectionId: formData.collectionId || '',
              imageUrls: this.product.imageUrls,
              mainImageUrl: this.product.imageUrls[0],
              size: formData.size || '',
              material: formData.material || '',
              color: formData.color || '',
              brand: formData.brand || '',
              favoriteCount: this.product.favoriteCount,
            };

            this.productService
              .updateProduct(id, productData)
              .subscribe((response) => {
                this.loading = false;
                if (response.message === 'Cập nhật sản phẩm thành công') {
                  alert('Cập nhật sản phẩm thành công');
                  this.router.navigate(['/admin/products']);
                } else {
                  alert('Cập nhật bộ sưu tập thất bại');
                  this.editProductForm.reset();
                }
              });
          } else {
            alert('Cập nhật bộ sưu tập thất bại');
            this.editProductForm.reset();
          }
        });
    } else {
      this.imagesToDeleteIndex.sort((a, b) => b - a);
      this.imagesToDeleteIndex.forEach((indexDeleted: number) => {
        this.product.imageUrls.splice(indexDeleted, 1);
      });

      console.log(this.product.imageUrls);

      const productData: Product = {
        _id: id || '',
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        quantity: formData.quantity || 0,
        sold: 0,
        collectionId: formData.collectionId || '',
        imageUrls: this.product.imageUrls,
        mainImageUrl: this.product.imageUrls[0],
        size: formData.size || '',
        material: formData.material || '',
        color: formData.color || '',
        brand: formData.brand || '',
        favoriteCount: this.product.favoriteCount,
      };

      this.productService
        .updateProduct(id, productData)
        .subscribe((response) => {
          this.loading = false;
          if (response.message === 'Cập nhật sản phẩm thành công') {
            alert('Cập nhật sản phẩm thành công');
            this.router.navigate(['/admin/products']);
          } else {
            alert('Cập nhật bộ sưu tập thất bại');
            this.editProductForm.reset();
          }
        });
    }
  }
}
