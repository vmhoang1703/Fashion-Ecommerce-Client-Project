import { Collection } from './../../../models/collection';
import { Component, OnInit } from '@angular/core';

// Import service
import { CollectionService } from '../../../services/collection.service';

@Component({
  selector: 'app-admin-collection',
  templateUrl: './admin-collection.component.html',
  styleUrls: ['./admin-collection.component.css'],
})
export class AdminCollectionComponent implements OnInit {
  collections: Collection[] = [];

  constructor(
    private collectionService: CollectionService // Inject service
  ) {}

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionService.getCollections().subscribe((response: any) => {
      this.collections = response.collections;
    });
  }

  deleteCollection(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa bộ sưu tập này?')) {
      this.collectionService.deleteCollection(id).subscribe(
        (response) => {
          alert('Xóa bộ sưu tập thành công!');
          this.getCollections();
        },
        (error) => {
          console.log(error);
          alert('Xóa bộ sưu tập thất bại!');
        }
      );
    }
  }
}
