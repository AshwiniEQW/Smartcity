import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.css']
})
export class FeedbackDetailsComponent implements OnInit {
  feedbackData: any;

  user_id: any;
  token: any;
  obj1: any;
  obj3: any;

  
  url = 'http://164.52.208.77:3000/';
 
 
  user_name: any;
  imgPath: any;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number=3;
 
  constructor(public dialogRef: MatDialogRef<FeedbackDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
   
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.user_name = localStorage.getItem('full_name');
    this.imgPath = localStorage.getItem('image');
    this.obj1 = {
      'user_id': this.user_id,
      'token': this.token,
    }
  
   this.getFeedbackDetails();

  }

 
  getFeedbackDetails() {
    
    let obj2 = {

      'feedback_id': this.data.feedback_id,
      'feedbackfor': this.data.feedbackfor,
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
    this.service.getFeedbackById(obj3).subscribe(res => {
      this.feedbackData = res.data[0];
    });
  }

 
  onClose() {
    this.dialogRef.close();
  }


  

}
