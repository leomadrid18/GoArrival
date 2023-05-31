import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-successful-reservation',
  templateUrl: './successful-reservation.component.html',
  styleUrls: ['./successful-reservation.component.css']
})
export class SuccessfulReservationComponent implements OnInit {

  @Input() data: any;
  @Input() datosuser: any;
  company: any;
  updateAproval: any;
  logindata: any;
  constructor(private headService: HeaderService,private router: Router) { }

  ngOnInit(): void {
    this.logindata = this.headService.getDataLogin();
    this.company = this.logindata.ocompany;
    this.updateAproval = this.logindata.ocompany?.ocompanyConfiguration?.updateApprovals;
  }

  goInit(){
    this.router.navigate(['/flights']);
  }

}
