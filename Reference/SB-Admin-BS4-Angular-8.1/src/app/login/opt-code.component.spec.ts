import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptCodeComponent } from './opt-code.component';

describe('OptCodeComponent', () => {
  let component: OptCodeComponent;
  let fixture: ComponentFixture<OptCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
