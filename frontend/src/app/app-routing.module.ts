import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { SellerComponent } from './components/seller/seller.component';
import { BicycleComponent } from './components/bicycle/bicycle.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'sellers', component: SellerComponent},
  { path: 'clients', component: ClientComponent},
  { path: 'bicycles', component: BicycleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
