import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { TodoItemDetailComponent } from './todo-item-detail/todo-item-detail.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [CommonModule, LayoutRoutingModule, TranslateModule, NgbDropdownModule, FormsModule],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, HeroesComponent, HeroDetailComponent, TodoItemDetailComponent, TodoItemsComponent ]
})
export class LayoutModule { }
