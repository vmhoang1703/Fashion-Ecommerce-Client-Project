import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from 'src/app/services/collection.service';
import { Collection } from '../../../../models/collection';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css'],
})
export class EditCollectionComponent implements OnInit {
  editCollectionForm!: FormGroup;
  selectedImage!: File;
  collection!: Collection;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchCollectionData();
  }

  initializeForm(): void {
    this.editCollectionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  fetchCollectionData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.collectionService.getCollectionById(id).subscribe(
        (response: any) => {
          this.collection = response.collection;
          this.editCollectionForm.patchValue({
            title: this.collection.title,
            description: this.collection.description,
            imageUrl: this.collection.imageUrl || '',
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
    if (this.editCollectionForm.valid && this.selectedImage) {
      const formData = this.editCollectionForm.value;
      const file: File | null = this.selectedImage;
      
    }
  }
}
