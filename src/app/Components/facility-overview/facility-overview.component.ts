import { Component, OnInit } from '@angular/core';
import { EditFacilityComponent } from '../edit-facility/edit-facility.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.services';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
@Component({
  selector: 'app-facility-overview',
  templateUrl: './facility-overview.component.html',
  styleUrls: ['./facility-overview.component.css']
})
export class FacilityOverviewComponent implements OnInit {
  facilityType:any;
  url='http://164.52.208.77:3000/';
  user_id: any;
  token: any;
  DATA: any;
  constructor(private dialog: MatDialog,
              private service: ApiService,private messageService: ParentChildCommunicationService) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getFacilityCount();
    
  }

  getFacilityCount(){
    
    this.service.getFacilityCount(this.DATA).subscribe((res) => {
      //console.log(res);

      this.facilityType = res.data;
     

    });
   // this.facilityType=JSON.parse(localStorage.getItem('facility_data')|| '{}');

  //console.log("facility_data",this.facilityType);

  
  // for(let i=0;i<this.facilityType.length;i++){
  //  // console.log(url+this.facilityType[i].facility_icon_path);
  // }
  
  }
  editFacility(){
    let dialogRef = this.dialog.open(EditFacilityComponent, {
      width: '60%',
      autoFocus: false,
      maxHeight: '90vh',
    });
    dialogRef.afterClosed().subscribe(s => {
     
      this.getFacilityCount();
         });
  }

  displayMap(facilityidClicked:any,facilityName:any,facilityIcon:any) {
    

    

    localStorage.setItem('facility_id', facilityidClicked);
    // localStorage.setItem('facility_name', facilityName);
    // localStorage.setItem('facility_icon', facilityIcon);
    let id = '10';
    let componentName = "FacilityMap"
    this.messageService.setMessage(id, componentName);

  }

  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);

  }

}
