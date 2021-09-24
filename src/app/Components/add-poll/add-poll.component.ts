import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { DatePipe } from '@angular/common';
import { PollService } from 'src/app/jsonFiles/poll.service';


@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css']
})
export class AddPollComponent implements OnInit {
 
  //pollCategoryType:any;
  pollCategoryData:any;
  popupLabel = 'Add New Poll';
  popupIcon = 'plus';
  currentDate = new Date();
  pollForm: FormGroup;
  userName: string = '';
  isEdit: boolean = false;
  pollData: any;
  url='http://164.52.208.77:3000/';
  constructor(
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private dialogRef: MatDialogRef<AddPollComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private toastrService: ToastrService,
    private pollService: PollService) { }

  ngOnInit(): void {
    //  this.pollCategoryType = [
    //   {
    //     'key': '1',
    //     'value': 'Unauthorized Hoardings'
    //   },
    //   {
    //     'key': '2',
    //     'value': 'Road repair/Potholes issues'
    //   },
    //   {
    //     'key': '3',
    //     'value': 'Drain and Sewage System'
    //   },
    //   {
    //     'key': '4',
    //     'value': 'Street light issues'
    //   },
    //   {
    //     'key': '5',
    //     'value': 'Garbage lifting/Area cleaning'
    //   },
    //   {
    //     'key': '6',
    //     'value': 'Water supply issues'
    //   },
    //   {
    //     'key': '7',
    //     'value': 'Illegal contruction'
    //   },
    //   {
    //     'key': '8',
    //     'value': 'Animal issues'
    //   },
    //   {
    //     'key': '9',
    //     'value': 'Public toilet issues'
    //   },
    //   {
    //     'key': '10',
    //     'value': 'Unauthorised hawkers and stalls'
    //   }
    // ];
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_id,
      'token': token,
    }
    
    this.initForm();
    this.getPollCategory();
    if (this.data) {
      this.popupLabel = 'Edit Poll';
      this.popupIcon = 'edit';
      this.isEdit = true;
      this.userName = this.data.full_name;

      console.log("poll data object", this.data);

      let obj2 = {
        'poll_id': this.data.poll_id,
        'poll_options_id': this.data.poll_options_id,
        'admin_id': this.data.admin_id
      }
      let obj3 = {
        ...obj1, ...obj2
      }
      // console.log("checking here:.....", obj3);
      this.service.getPollById(obj3).subscribe(res => {
        //console.log("response", res.data);
        this.pollData = res.data;

        let optionString = this.pollData.option_name;
        optionString = optionString.join('\n');
        //  console.log("optionString:",optionString);
        this.pollForm.patchValue({
          poll_subject: this.pollData.poll_subject,
          start_date: this.datepipe.transform(this.pollData.start_date, 'yyyy-MM-dd'),
          end_date: this.datepipe.transform(this.pollData.end_date, 'yyyy-MM-dd'),
          poll_category_id:this.pollData.poll_cat_id,
          question_type_id: this.pollData.question_type,
          answer_choice: optionString,
          is_disable:this.pollData.is_disable
       
        });
      }
        ,
        error => {
          this.toastrService.warning('Something went wrong!');
        }
      )

    }
  }

  initForm() {
    this.pollForm = new FormGroup({
      'poll_subject': new FormControl(null, [Validators.required]),
      'start_date': new FormControl(null,),
      'end_date': new FormControl(null,),
      'poll_category_id': new FormControl('Select Category', [Validators.required]),
      'question_type_id': new FormControl('single'),
      'answer_choice': new FormControl(null, [Validators.required]),
      'is_disable': new FormControl()
    });
  }
  get f() { return this.pollForm.controls; }
  get today() { return new Date() }

  getPollCategory(){
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj = {
      'user_id': user_id,
      'token': token,
    }
    
    this.service.getPollCategory(obj).subscribe(res => {
      this.pollCategoryData = res.data;

      });
  }
  savePoll() {
    let optionAry = this.pollForm.controls.answer_choice.value.split('\n');
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_id,
      'token': token,
    }

    if (this.data) {

      if (this.pollData.admin_id == user_id) {
        let disable_poll_status: boolean = false;
        if (this.pollForm.controls.is_disable.value == true) {
          disable_poll_status = true;
        }
        else {
          disable_poll_status = false;
        }
        let obj2 = {


          'poll_subject': this.pollForm.controls.poll_subject.value,
          'start_date': this.pollForm.controls.start_date.value,
          'end_date': this.pollForm.controls.end_date.value,
          'poll_cat_id':this.pollForm.controls.poll_category_id.value,
          'question_type_id': this.pollForm.controls.question_type_id.value,
          'answer_choice': optionAry,
          'is_disable': disable_poll_status,
          'poll_options_id': this.data.poll_options_id,
          'poll_id': this.data.poll_id,

        }

        let obj3 = {
          ...obj1, ...obj2
        }
        console.log('update poll object', obj3);
        this.service.updatePoll(obj3).subscribe(res => {
          this.toastrService.success('Poll Updated successfully!');
          this.pollForm.reset();
          this.onClose();
        },
          error => {
            //this.toastrService.warning('Poll already exist!');
          }
        )
      }
      else
        this.toastrService.warning("Sorry! You can't edit this poll!");
    }

    else {

      let obj2 = {

        'poll_subject': this.pollForm.controls.poll_subject.value,
        'start_date': this.pollForm.controls.start_date.value,
        'end_date': this.pollForm.controls.end_date.value,
        'poll_cat_id':this.pollForm.controls.poll_category_id.value,
        'answer_choice': optionAry,
        'question_type_id': this.pollForm.controls.question_type_id.value,

      }
      let obj3 = {
        ...obj1, ...obj2
      }
      console.log(obj3);
      this.service.addPoll(obj3).subscribe(res => {

        if(res.status){
          this.toastrService.success('Poll added successfully!');
          this.pollForm.reset();
          this.onClose();
        }
        // else if(res.status==false && res.message=="start_date greater than end_date"){
        //   this.toastrService.warning('Start Date can\'t be greater than End date!');
        // }
        // else if(res.status==false && res.message=="options cannot be more than 10"){
        //   this.toastrService.warning('Answer choices can\'t be greater than 10!');
        // }
        // else if(res.status==false && res.message=="Duplicate Subject found"){
        //   this.toastrService.warning('Duplicate Poll Subject found!');
        // }
        
        // else
        // this.toastrService.warning('Oops! Something went wrong.');
      },
        error => {
          //this.toastrService.warning('Poll already exist!');
        }
      )


    }

  }


  onClose() {
    this.dialogRef.close();
  }
}
