import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from 'src/app/services/collection.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Collection } from '../../../../models/collection';
import { FileUpload } from '../../../../models/file-upload';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css'],
})
export class EditCollectionComponent implements OnInit {
  editCollectionForm!: FormGroup;
  collection!: Collection;
  selectedImage!: File;
  currentFileUpload!: FileUpload;
  percentage = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getCollection();
  }

  initializeForm(): void {
    this.editCollectionForm = this.fb.group({
      title: [''],
      description: [''],
      imageUrl: [''],
    });
  }

  getCollection(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.collectionService.getCollectionById(id).subscribe(
        (response: any) => {
          this.collection = response.collection;
          this.editCollectionForm.patchValue({
            title: this.collection.title,
            description: this.collection.description,
            imageUrl: this.collection.imageUrl,
          });
        },
        (error) => {
          console.log(error);
          alert('Lấy thông tin bộ sưu tập thất bại!');
        }
      );
    }
  }

  // fetchCollectionImage(id: string): void {
  //   this.collectionService.getCollectionImage(id).subscribe(
  //     (imageData: Blob) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(imageData);
  //       reader.onloadend = () => {
  //         this.collection.imageUrl = reader.result as string;
  //         this.editCollectionForm.patchValue({
  //           imageUrl: this.collection.imageUrl,
  //         });
  //       };
  //     },
  //     (error) => {
  //       console.log(error);
  //       alert('Lấy ảnh bộ sưu tập thất bại!');
  //     }
  //   );
  // }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0] as File;
  }

  updateCollection(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      alert('Cập nhật bộ sưu tập thất bại');
      return;
    }

    const formData = this.editCollectionForm.value;

    if (this.selectedImage) {
      const file: File | null = this.selectedImage;

      this.currentFileUpload = new FileUpload(file);

      this.uploadService
        .pushFileToStorage(this.currentFileUpload)
        .subscribe((downloadURL) => {
          if (downloadURL) {
            const collectionData: Collection = {
              _id: id || '',
              title: formData.title || '',
              description: formData.description || '',
              imageUrl: downloadURL,
            };

            this.collectionService
              .updateCollection(id, collectionData)
              .subscribe((response) => {
                if (response.message === 'Cập nhật bộ sưu tập thành công') {
                  alert('Cập nhật bộ sưu tập thành công');
                  this.router.navigate(['/admin/collections']);
                } else {
                  alert('Cập nhật bộ sưu tập thất bại');
                  this.editCollectionForm.reset();
                }
              });
          } else {
            alert('Cập nhật bộ sưu tập thất bại');
            this.editCollectionForm.reset();
          }
        });
    } else {
      const collectionData: Collection = {
        _id: id,
        title: formData.title || '',
        description: formData.description || '',
        imageUrl: this.collection.imageUrl,
      };

      this.collectionService
        .updateCollection(id, collectionData)
        .subscribe((response) => {
          if (response.message === 'Cập nhật bộ sưu tập thành công') {
            alert('Cập nhật bộ sưu tập thành công');
            this.router.navigate(['/admin/collections']);
          } else {
            alert('Cập nhật bộ sưu tập thất bại');
            this.editCollectionForm.reset();
          }
        });
    }
  }
}
