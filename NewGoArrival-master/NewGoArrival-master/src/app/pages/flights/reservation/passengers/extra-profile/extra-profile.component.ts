import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-extra-profile',
  templateUrl: './extra-profile.component.html',
  styleUrls: ['./extra-profile.component.css']
})
export class ExtraProfileComponent implements OnInit {

  @Input() lextraProfiles: any[] = [];
  @Output() profileEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  profileSelected(id: any) {
    let reason = this.lextraProfiles.find(x => x.id == id);
    this.profileEvent.emit(reason.description);
  }

}
