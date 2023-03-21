import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleCentralizerComponent } from './seekers/role-centralizer/role-centralizer.component';
import { SearchFlightComponent } from './seekers/search-flight/search-flight.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PassengerCounterComponent } from './seekers/search-flight/passenger-counter/passenger-counter.component';



const routes: Routes = [
  {
    path: '',
    component: FlightsComponent
  }
];

@NgModule({
  declarations: [
    FlightsComponent,
    RoleCentralizerComponent,
    SearchFlightComponent,
    PassengerCounterComponent,
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    AutocompleteLibModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class FlightsModule { }
