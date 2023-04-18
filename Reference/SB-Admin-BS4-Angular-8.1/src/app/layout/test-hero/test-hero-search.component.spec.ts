import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHeroSearchComponent } from './test-hero-search.component';

describe('TestHeroSearchComponent', () => {
  let component: TestHeroSearchComponent;
  let fixture: ComponentFixture<TestHeroSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHeroSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
