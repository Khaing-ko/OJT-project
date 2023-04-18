import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHeroListComponent } from './test-hero-list.component';

describe('TestHeroListComponent', () => {
  let component: TestHeroListComponent;
  let fixture: ComponentFixture<TestHeroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHeroListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
