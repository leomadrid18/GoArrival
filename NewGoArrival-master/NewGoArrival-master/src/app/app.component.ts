import { Component, OnInit } from '@angular/core';
import { HeaderService } from './services/head.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public headerService: HeaderService) {}
  title = 'GoArrival';
  showHeader = true;
  showOverlay = false;
  ngOnInit(){
    setTimeout(function() {
      $("#divLoaderLogin").hide();
    }, 1000);
  }
}
