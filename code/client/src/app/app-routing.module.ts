import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankListComponent } from './pages/bank-list/bank-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { BankDetailsComponent } from './pages/bank-details/bank-details.component';

const routes: Routes = [
  { path: '',                component: HomePageComponent },
  { path: 'profile',         component: UserPageComponent },
  { path: 'mybanks',         component: BankListComponent },
  { path: 'mybanks/:bankId', component: BankDetailsComponent },
  { path: 'signup',          component: SignUpComponent },
  { path: 'login',           component: LogInComponent },
  { path: '**',              component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
