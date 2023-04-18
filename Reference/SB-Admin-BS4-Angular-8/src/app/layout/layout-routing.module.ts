import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LayoutComponent } from './layout.component';
import { CustomerReportComponent } from './report/customer-report.component';
import { TodoItemDetailComponent } from './todo-item-detail/todo-item-detail.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule)
            },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            },
            { path: 'heroes', component: HeroesComponent },
            { path: 'detail/:id', component: HeroDetailComponent },
            { path: 'todo-items', component: TodoItemsComponent },
            { path: 'item-detail/:id', component: TodoItemDetailComponent },

            {
                path: 'test-hero',
                loadChildren: () => import('./test-hero/test-hero.module').then((m) => m.TestHeroModule)
            },
            {
                path: 'customer',
                loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
            }
            ,
            {
                path: 'supplier',
                loadChildren: () => import('./supplier/supplier.module').then((m) => m.SupplierModule)
            },
            {
                path: 'report',
                loadChildren: () => import('./report/report.module').then((m) => m.ReportModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
