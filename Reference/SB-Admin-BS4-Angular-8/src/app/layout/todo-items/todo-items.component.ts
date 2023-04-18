import { Component } from '@angular/core';
import { Item } from '../../core/model/item';
import { TodoitemService } from '../../core/service/todoitem.service';
import { MessageService } from '../../core/service/message.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent {
  items: Item[] = [];
  selectedHero?: Item;
  
   constructor(private TodoItemService: TodoitemService, private messageService: MessageService) {

   }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.TodoItemService.getItems()
        .subscribe(items => this.items = items);
  }

  add(name: string): void {
    const Name = name.trim();
    if (!Name) { return; }
    this.TodoItemService.addItem({ Name } as Item)
      .subscribe(item => {
        this.items.push(item);
      });
  }

  delete(hero: Item): void {
    this.items = this.items.filter(h => h !== hero);
    this.TodoItemService.deleteItem(hero.Id).subscribe();
  }

  search(name: string): void {
    if (!name) { return this.getItems(); }
    this.TodoItemService.searchItem(name)    
        .subscribe(items => this.items = items);
  }

}

