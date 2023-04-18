import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestHeroDetailsComponent } from './test-hero-details.component';
import { TestHeroListComponent } from './test-hero-list.component';
import { TestHeroAddComponent } from './test-hero-add.component';

const routes: Routes = [
  { path: '', component: TestHeroListComponent },
  { path: 'test-hero-details/:id', component: TestHeroDetailsComponent },
  { path: 'test-hero-add', component: TestHeroAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestHeroRoutingModule { 

     
}
