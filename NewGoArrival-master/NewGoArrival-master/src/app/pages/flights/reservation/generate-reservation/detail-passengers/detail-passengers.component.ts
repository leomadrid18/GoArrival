import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-passengers',
  templateUrl: './detail-passengers.component.html',
  styleUrls: ['./detail-passengers.component.css']
})
export class DetailPassengersComponent implements OnInit {
  @Input() lsusers: any;
  padding = "";
  constructor() { }

  ngOnInit(): void {
    console.log(this.lsusers);
    if(this.lsusers.length > 1){
      this.padding = "pl-3"
    }
  }

}
