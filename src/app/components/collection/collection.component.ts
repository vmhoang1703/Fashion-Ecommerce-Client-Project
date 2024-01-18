import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import model
import { Collection } from 'src/app/models/collection';

// Import service
import { CollectionService } from 'src/app/services/collection.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collections: Collection[] = [];

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionService.getCollections().subscribe(
      (response: any) => {
        this.collections = response.collections;

        this.collections.forEach((collection) => {
          this.collectionService
            .getCollectionImage(collection._id)
            .subscribe((imageData: Blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(imageData);
              reader.onloadend = () => {
                collection.imageUrl = reader.result as string;
              };
            });
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
