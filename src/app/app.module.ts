import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseLayoutComponent } from './Ui/purchase-layout/purchase-layout.component';
import { HeaderComponent } from './shared/header/header.component';
import { InformationComponent } from './shared/information/information.component';
import { AddFormComponent } from './Ui/add-form/add-form.component';
import { PurchaseComponent } from './Ui/purchase/purchase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseLayoutComponent,
    HeaderComponent,
    InformationComponent,
    AddFormComponent,
    PurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
