import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import service
import { CollectionService } from 'src/app/services/collection.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

// Import interface
import { Collection } from '../../../../models/collection';
import { FileUpload } from '../../../../models/file-upload';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css'],
})
export class CreateCollectionComponent implements OnInit {
  createCollectionForm!: FormGroup;
  selectedImage!: File;
  currentFileUpload!: FileUpload;
  percentage = 0;

  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private fb: FormBuilder,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.createCollectionForm = this.fb.group({
      title: [''],
      description: [''],
      imageUrl: [''],
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
  }

  createCollection() {
    if (this.createCollectionForm.valid && this.selectedImage) {
      const formData = this.createCollectionForm.value;

      const file: File | null = this.selectedImage;

      if (file) {
        this.currentFileUpload = new FileUpload(file);

        this.uploadService
          .pushFileToStorage(this.currentFileUpload)
          .subscribe((downloadURL) => {
            if (downloadURL) {
              const collectionData: Collection = {
                _id: '',
                title: formData.title,
                description: formData.description,
                imageUrl: downloadURL,
              };

              this.collectionService
                .createCollection(collectionData)
                .subscribe((response) => {
                  if (response.message === 'Tạo bộ sưu tập thành công') {
                    alert('Tạo bộ sưu tập thành công');
                    this.router.navigate(['/admin/collections']);
                  } else {
                    alert('Tạo bộ sưu tập thất bại');
                    this.createCollectionForm.reset();
                  }
                });
            }
          });
      }
    }
  }
}
