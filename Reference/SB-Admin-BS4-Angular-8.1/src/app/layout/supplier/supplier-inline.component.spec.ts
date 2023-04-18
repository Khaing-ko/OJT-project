import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInlineComponent } from './supplier-inline.component';

describe('SupplierInlineComponent', () => {
  let component: SupplierInlineComponent;
  let fixture: ComponentFixture<SupplierInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierInlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
