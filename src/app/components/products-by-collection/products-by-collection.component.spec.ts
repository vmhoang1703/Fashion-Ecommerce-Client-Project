import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsByCollectionComponent } from './products-by-collection.component';

describe('ProductsByCollectionComponent', () => {
  let component: ProductsByCollectionComponent;
  let fixture: ComponentFixture<ProductsByCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsByCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsByCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
