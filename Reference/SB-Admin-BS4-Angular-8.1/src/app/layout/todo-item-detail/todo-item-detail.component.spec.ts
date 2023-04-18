import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemDetailComponent } from './todo-item-detail.component';

describe('TodoItemDetailComponent', () => {
  let component: TodoItemDetailComponent;
  let fixture: ComponentFixture<TodoItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
