import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCollectionComponent } from './admin-create-collection.component';

describe('AdminCreateCollectionComponent', () => {
  let component: AdminCreateCollectionComponent;
  let fixture: ComponentFixture<AdminCreateCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
