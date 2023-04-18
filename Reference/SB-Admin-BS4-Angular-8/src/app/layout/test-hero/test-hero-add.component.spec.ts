import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHeroAddComponent } from './test-hero-add.component';

describe('TestHeroAddComponent', () => {
  let component: TestHeroAddComponent;
  let fixture: ComponentFixture<TestHeroAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHeroAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHeroAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
