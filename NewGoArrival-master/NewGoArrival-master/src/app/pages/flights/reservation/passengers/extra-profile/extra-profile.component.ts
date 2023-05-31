import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-extra-profile',
  templateUrl: './extra-profile.component.html',
  styleUrls: ['./extra-profile.component.css']
})
export class ExtraProfileComponent implements OnInit {
  valor: any;
  @Input() lextraProfiles: any[] = [];
  @Output() profileEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.valor = this.lextraProfiles[0].profile;
  }

  

}
