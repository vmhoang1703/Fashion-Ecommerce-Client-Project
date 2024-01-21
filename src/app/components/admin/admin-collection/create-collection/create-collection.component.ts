import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import service
import { CollectionService } from 'src/app/services/collection.service';

// Import interface
import { Collection } from '../../../../models/collection';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css'],
})
export class AdminCreateCollectionComponent implements OnInit {
  createCollectionForm!: FormGroup;
  selectedImage!: File;

  constructor(
    private collectionService: CollectionService, // Inject service
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createCollectionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.createCollectionForm.valid && this.selectedImage) {
      const formData = this.createCollectionForm.value;

      // Create FormData object
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('image', this.selectedImage, this.selectedImage.name);

      this.collectionService.createCollection(uploadData).subscribe(
        (response) => {
          alert('Thêm bộ sưu tập thành công!');
          this.router.navigate(['/admin/collections']);
        },
        (error) => {
          console.log(error);
          alert('Thêm bộ sưu tập thất bại!');
        }
      );
    }
  }
}
