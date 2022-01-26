import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { MenuGeneratorComponent } from './menu-generator/menu-generator.component';
import { MenuOverviewComponent } from './menu-overview/menu-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MenuItemComponent } from './shared/components/menu-item/menu-item.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HealthGridComponent } from './shared/components/health-grid/health-grid.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuDetailComponent,
    MenuGeneratorComponent,
    MenuOverviewComponent,
    MenuItemComponent,
    HealthGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
