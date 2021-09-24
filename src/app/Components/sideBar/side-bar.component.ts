import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ReportSideBarElement from 'src/app/jsonFiles/ReportSideBar';
import { ApiService } from 'src/app/services/api.services';
import { ParentChildCommunicationService } from '../../services/childToParentCommunication/child-parent-communication.service'
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {
  indexOf: number;
  topWard: any;
  lessWard: any;
  isLogout: boolean = false;
  ideaSubmisssionReportId = '';
  ComponentName = '';
  subIndex: number;
  public OnActive1: "OnActive";
  public OffActive: "OffActive";
  reports: any;
  showBigHeader: boolean;
  showSmallHeader: boolean;
  user_id: any;
  token: any;
  DATA: any;
  user_name:any;
  url='http://164.52.208.77:3000/';
  imgPath:any;
  constructor(private messageService: ParentChildCommunicationService,
    private router: Router,
    private toastr:ToastrService,
    private dialog:MatDialog,
    private service:ApiService
  ) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.user_name = localStorage.getItem('full_name');
    this.imgPath = localStorage.getItem('image');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getTopWard();
    this.getLessWard();
    this.getUpdatedMessage();
    this.indexOf = 0;
    this.reports = ReportSideBarElement;
    this.showBigHeader = true;
    this.showSmallHeader = false;
    

  }
  getUpdatedMessage() {

    this.messageService.id.subscribe(
      id => {
        this.indexOf = parseInt(id);
      }
    )

  }
  OnSelect(i: number) {
    this.indexOf = i;
    for (var icnt = 0; icnt < 9; icnt++) {


      if (icnt == this.indexOf)
        this.reports[icnt].renderVariable = "true";
      else
        this.reports[icnt].renderVariable = "false";

    }

  }
  getTopWard() {
    this.service.getTopWard(this.DATA).subscribe((res) => {
    this.topWard = res.data;
    });
  }

  getLessWard() {
    this.service.getLessWard(this.DATA).subscribe((res) => {
      this.lessWard = res.data;
    });
   }

  sideBarToggleFunction() {
    if (this.showBigHeader == false) {

      this.showBigHeader = true;
      this.showSmallHeader = false;
    }
    else {

      this.showBigHeader = false;
      this.showSmallHeader = true;
    }
  }

  logout() {

    this.isLogout = true;
 
      const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
        data:'Are you sure you want to log out?'})
      dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar){
        setTimeout(() => {
          this.isLogout = false;
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('full_name');
          localStorage.removeItem('image');
          localStorage.removeItem('facility_id');
        if(localStorage.getItem('rememberMe')=='true')  {
  
        }
        else{
         
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('encrypt_username');
          localStorage.removeItem('encrypt_password');
        }
       
        this.router.navigate(['/']);
        this.toastr.warning('Logging Out!');
        let i = 0;
        this.OnSelect(i);
      },1000)
      }
    
    })
     // this.router.navigate(['/']);
      
    
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i=0;
    this.messageService.OnSelect(i);
  }
}
