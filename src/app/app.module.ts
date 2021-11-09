import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MenuGeneratorComponent } from './menu-generator/menu-generator.component';
import { OverviewComponent } from './overview/overview.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuGeneratorComponent,
    OverviewComponent,
    MenuDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
