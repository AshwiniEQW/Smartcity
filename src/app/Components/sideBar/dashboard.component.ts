import { Component, OnInit } from '@angular/core';
import { User } from '../models/user-model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.services';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  showBigHeader: boolean = false;
  showSmallHeader: boolean = true;
  showNotificationDroupdown: boolean = false;
  showUserRole : boolean = false;

  cardList = [{
    text: 'Data Unavailable',
  }, {
    text: 'Data Unavailable',
  }, {
    text: 'Data Unavailable',
  }];


  constructor(private cookieService: CookieService, private router: Router, private service: ApiService, private toastr: ToastrService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {

    if( User.showBigHeader){
      this.showBigHeader = User.showBigHeader;
      this.showSmallHeader = User.showSmallHeader;
    }
    else {
      User.showBigHeader = false;
      User.showSmallHeader = true;
    }

    window.onbeforeunload = function(){
      sessionStorage.setItem("status", "true");
    }
    
    var savedUser_log = sessionStorage.getItem("user_name");
    var savedUser_id = sessionStorage.getItem("user_id");
    var savedUserRole = sessionStorage.getItem("role");
    var signInStatus = sessionStorage.getItem("status");
    if ( (savedUser_log === "undefined" || savedUser_log === null ) && (savedUser_id === "undefined" || savedUser_id === null ) ) {
      this.router.navigateByUrl('/');
    }
    else if(signInStatus === "true") {
      sessionStorage.clear();
      this.router.navigateByUrl('/');
    }
    

    if(savedUserRole == "moderator"){
      this.showUserRole = true;
    }
    else {
      this.showUserRole = false;
    }

  }

  sideBarToggleFunction() {
    if (this.showBigHeader == false) {
      User.showBigHeader = true;
      User.showSmallHeader = false;
      this.showBigHeader = true;
      this.showSmallHeader = false;
    }
    else {
      User.showBigHeader = false;
      User.showSmallHeader = true;
      this.showBigHeader = false;
      this.showSmallHeader = true;
    }
  }

  notificationDropdown() {

    var userid = (Number)(sessionStorage.getItem("user_id"));
    var data={
      "userid" : userid
    }

    if (this.showNotificationDroupdown == false) {
      this.showNotificationDroupdown = true;
      this.service.notification(data).subscribe((respdata) => {
        // if(respdata.message != "Data Not Found"){
          this.cardList = respdata.data;
        // }
      },
        error => {
          // this.toastr.success('Data Unavailable!');
        }
      );
    }
    else {
      this.showNotificationDroupdown = false;
    }

  }

  notificationOutside() {
    if (this.showNotificationDroupdown == true) {
      this.showNotificationDroupdown = false;
    }
  }

  Logout() {

    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  


}
