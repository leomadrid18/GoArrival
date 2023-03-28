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
import { RecommendationComponent } from './flights-list/recommendation/recommendation.component';
import { SectionComponent } from './flights-list/recommendation/section/section.component';
import { SegmentComponent } from './flights-list/recommendation/segment/segment.component';
import { SegmentGroupComponent } from './flights-list/recommendation/segment-group/segment-group.component';
import { FinalPriceComponent } from './flights-list/recommendation/final-price/final-price.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormattimeairportPipe } from 'src/app/pipes/formattimeairport.pipe';


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
    FormattimeairportPipe,
    FlightsListComponent,
    CalendarFlightsComponent,
    RecommendationComponent,
    SectionComponent,
    SegmentComponent,
    SegmentGroupComponent,
    FinalPriceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    StoreModule.forRoot({  }),
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
