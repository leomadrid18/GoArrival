import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { SeekersComponent } from './seekers/seekers.component';
import { SearchHotelComponent } from './seekers/search-hotel/search-hotel.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { HotelComponent } from './hotel.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HotelComponent
  }
];

@NgModule({
  declarations: [
    HotelListComponent,
    HotelComponent,
    SeekersComponent,
    SearchHotelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AutocompleteLibModule,
    RouterModule.forChild(routes)
  ]
})
export class HotelModule { }
