// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-citizen-details',
//   templateUrl: './citizen-details.component.html',
//   styleUrls: ['./citizen-details.component.css']
// })
// export class CitizenDetailsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.services';

@Component({
  selector: 'app-citizen-details',
  templateUrl: './citizen-details.component.html',
  styleUrls: ['./citizen-details.component.css']
})
export class CitizenDetailsComponent implements OnInit {

  fullname: string;
  showinitials: true;
  initials: string;
  user_id: any;
  token: any;
  DATA: any;
  Citizensdetails: any;
  ward_id: number;
  dataFound : boolean;

  url='http://164.52.208.77:3000/';

  constructor(private dialogRef: MatDialogRef<CitizenDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: ApiService) { }

  ngOnInit(): void {


    console.log("details component --", this.data);

    this.fullname = this.data.full_name;
    this.user_id = this.data.user_id;

    console.log(this.fullname, "------------------------------");
    console.log(this.ward_id, "------------------------------");

    this.getInitials();

    this.getCitizensDetails()


  }

  onClose() {
    this.Citizensdetails = "";
    this.dialogRef.close();
  }


  getInitials() {

    // this.initials =  this.fullname.split(" ").map((n)=>n[0]).join("");

    // console.log(this.initials)

    this.initials = this.fullname.charAt(0);

  }

  getCitizensDetails() {


    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'citizen_user_id': this.data.user_id
    }


    this.service.getCitizenByID(this.DATA).subscribe(res => {



      if (res.message = "Data found succussfully" && res.status == true) {
        this.Citizensdetails = res.data[0];
        console.log(this.Citizensdetails, '------------------------------------------------------');
         this.dataFound = true;

      }else{

        this.dataFound = false;

      }

    })

  }


}
