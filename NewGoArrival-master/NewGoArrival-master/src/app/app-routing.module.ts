import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/logins/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'flights',
    loadChildren: () => import('../app/pages/flights/flights.module').then(m => m.FlightsModule)
  },
  {
    path: 'hotel',
    loadChildren: () => import('../app/pages/hotel/hotel.module').then(m => m.HotelModule)
  },
  {
    path: 'cars',
    loadChildren: () => import('../app/pages/cars/cars.module').then(m => m.CarsModule)
  },
  {
    path: 'insurance',
    loadChildren: () => import('../app/pages/insurance/insurance.module').then(m => m.InsuranceModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
