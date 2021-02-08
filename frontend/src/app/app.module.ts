import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientComponent } from './components/client/client.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SellerComponent } from './components/seller/seller.component';
import { BicycleComponent } from './components/bicycle/bicycle.component';
import { TopbarComponent } from './others/topbar/topbar.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './others/sidebar/sidebar.component'

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    SellerComponent,
    BicycleComponent,
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
