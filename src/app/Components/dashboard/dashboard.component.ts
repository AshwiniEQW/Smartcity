import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import CitizensPopulation from '../../jsonFiles/populationCitizens'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // CitizensPopulation=CitizensPopulation;
  user_id: any;
  token: any;
  DATA: any;

  citizenCountList: any;
  total:any;
  registered:any;
  constructor(private service: ApiService, private messageService:ParentChildCommunicationService) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.DATA = {
      'user_Id': this.user_id,
      'token': this.token
    }
    this.getCitizenCount();
  }

  getCitizenCount() {
    this.service.getCitizenCount(this.DATA).subscribe((res) => {
      this.citizenCountList = res.data;
      this.total=this.citizenCountList.totalCitizen;
      this.registered=this.citizenCountList.registeredCitizen;
    });
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);

  }
}
