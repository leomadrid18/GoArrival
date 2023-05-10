import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleCentralizerComponent } from './seekers/role-centralizer/role-centralizer.component';
import { SearchFlightComponent } from './seekers/search-flight/search-flight.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PassengerCounterComponent } from './seekers/search-flight/passenger-counter/passenger-counter.component';
import { StoreModule } from '@ngrx/store';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { SearchFlightLowerComponent } from './seekers/search-flight-lower/search-flight-lower.component';
import { CalendarFlightsComponent } from './flights-list/calendar-flights/calendar-flights.component';
import { RecommendationComponent } from './flights-list/recommendation/recommendation.component';
import { SectionComponent } from './flights-list/recommendation/section/section.component';
import { SegmentComponent } from './flights-list/recommendation/segment/segment.component';
import { SegmentGroupComponent } from './flights-list/recommendation/segment-group/segment-group.component';
import { FinalPriceComponent } from './flights-list/recommendation/final-price/final-price.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { FormattimeairportPipe } from 'src/app/pipes/formattimeairport.pipe';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FamilyRateComponent } from './family-rate/family-rate.component';
import { FilterTimeComponent } from './filters/filter-time/filter-time.component';
import { FilterHourComponent } from './filters/filter-hour/filter-hour.component';
import { FilterAirlineComponent } from './filters/filter-airline/filter-airline.component';
import { OrderPriceComponent } from './filters/order-price/order-price.component';
import { AlertModule } from "ngx-bootstrap/alert";
import { ReservationComponent } from './reservation/reservation.component';
import { PassengersComponent } from './reservation/passengers/passengers.component';
import { PassengerDataComponent } from './reservation/passengers/passenger-data/passenger-data.component';
import { ValidateReservationComponent } from './reservation/validate-reservation/validate-reservation.component';
import { GenerateReservationComponent } from './reservation/generate-reservation/generate-reservation.component';
import { FechaformatPipe } from 'src/app/pipes/fechaformat.pipe';
import { DetailPriceComponent } from './reservation/detail-price/detail-price.component';

const routes: Routes = [
  {
    path: '',
    component: FlightsComponent
  },
  {path: 'flight-list',component: FlightsListComponent},
  {path: 'passenger-data',component: PassengersComponent}

];

@NgModule({
  declarations: [
    FlightsComponent,
    RoleCentralizerComponent,
    SearchFlightComponent,
    SearchFlightLowerComponent,
    PassengerCounterComponent,
    FormattimeairportPipe,
    FlightsListComponent,
    CalendarFlightsComponent,
    RecommendationComponent,
    SectionComponent,
    SegmentComponent,
    SegmentGroupComponent,
    FinalPriceComponent,
    FamilyRateComponent,
    FechaformatPipe,
    FilterTimeComponent,
    FilterHourComponent,
    FilterAirlineComponent,
    OrderPriceComponent,
    ReservationComponent,
    PassengersComponent,
    PassengerDataComponent,
    ValidateReservationComponent,
    GenerateReservationComponent,
    DetailPriceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    AutocompleteLibModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [BsModalService],
})
export class FlightsModule { }
