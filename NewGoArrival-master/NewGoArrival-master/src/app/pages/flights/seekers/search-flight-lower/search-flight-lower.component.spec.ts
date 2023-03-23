import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlightLowerComponent } from './search-flight-lower.component';

describe('SearchFlightLowerComponent', () => {
  let component: SearchFlightLowerComponent;
  let fixture: ComponentFixture<SearchFlightLowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFlightLowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFlightLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
