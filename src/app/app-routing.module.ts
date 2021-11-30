import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { MenuGeneratorComponent } from './menu-generator/menu-generator.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', component: MenuGeneratorComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'details', component: MenuDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
