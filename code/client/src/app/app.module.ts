import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BankApiService } from './services/bank-api.service';
import { BankCalulationsService } from './services/bank-calulations.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { AuthApiService } from './services/auth-api.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BankListComponent } from './pages/bank-list/bank-list.component';
import { BankFormComponent } from './components/bank-form/bank-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BankListComponent,
    BankFormComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    BankApiService,
    BankCalulationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
