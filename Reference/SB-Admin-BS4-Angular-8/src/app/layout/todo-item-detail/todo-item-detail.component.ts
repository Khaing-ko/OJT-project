import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../core/model/item';
import { TodoitemService } from '../../core/service/todoitem.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-item-detail',
  templateUrl: './todo-item-detail.component.html',
  styleUrls: ['./todo-item-detail.component.scss']
})
export class TodoItemDetailComponent {
  item: Item | undefined;
  constructor(
    private route: ActivatedRoute,
    private itemService: TodoitemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItem();
  }
  
  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.item) {
      this.itemService.updateItem(this.item)
        .subscribe(() => this.goBack());
    }
  }
}
