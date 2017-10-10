import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BankApiService } from './services/bank-api.service';
import { RemainderApiService } from './services/remainder-api.service';
import { BankCalulationsService } from './services/bank-calulations.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
// import { AuthApiService } from './services/auth-api.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BankListComponent } from './pages/bank-list/bank-list.component';
import { BankFormComponent } from './components/bank-form/bank-form.component';
import { BankItemComponent } from './components/bank-item/bank-item.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    BankListComponent,
    BankFormComponent,
    NotFoundComponent,
    BankItemComponent,
    HomePageComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    BankApiService,
    BankCalulationsService,
    RemainderApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
