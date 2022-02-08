import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { MenuGeneratorComponent } from './menu-generator/menu-generator.component';
import { MenuOverviewComponent } from './menu-overview/menu-overview.component';

const routes: Routes = [
  { path: '', component: MenuOverviewComponent },
  { path: 'generator', component: MenuGeneratorComponent },
  { path: 'details/:id', component: MenuDetailComponent },
  { path: 'details', component: MenuDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
