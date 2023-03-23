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
import { StoreModule } from '@ngrx/store';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { SearchFlightLowerComponent } from './seekers/search-flight-lower/search-flight-lower.component';
import { CalendarFlightsComponent } from './flights-list/calendar-flights/calendar-flights.component';


const routes: Routes = [
  {
    path: '',
    component: FlightsComponent
  },
  {path: 'flight-list',component: FlightsListComponent}

];

@NgModule({
  declarations: [
    FlightsComponent,
    RoleCentralizerComponent,
    SearchFlightComponent,
    SearchFlightLowerComponent,
    PassengerCounterComponent,
    FlightsListComponent,
    CalendarFlightsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot({  }),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    AutocompleteLibModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class FlightsModule { }
