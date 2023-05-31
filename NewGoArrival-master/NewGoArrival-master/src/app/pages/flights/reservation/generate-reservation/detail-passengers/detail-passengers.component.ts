import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-passengers',
  templateUrl: './detail-passengers.component.html',
  styleUrls: ['./detail-passengers.component.css']
})
export class DetailPassengersComponent implements OnInit {
  @Input() users: any;
  padding = "";
  constructor() { }

  ngOnInit(): void {
    console.log(this.users[0].firstName);
    if(this.users.length > 1){
      this.padding = "pl-3"
    }
  }

}
