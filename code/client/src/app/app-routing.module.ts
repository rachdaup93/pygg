import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankListComponent } from './pages/bank-list/bank-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { SignUpComponent } from './pages/sign-up/sign-up.component';
//
const routes: Routes = [
  {
    path: '',
    component: BankListComponent,
    // canDeactivate: [ HackGuardService ]
  },
  // { path: 'signup',         component: SignUpComponent },
  // { path: 'login',          component: SignUpComponent },
  { path: '**',             component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
