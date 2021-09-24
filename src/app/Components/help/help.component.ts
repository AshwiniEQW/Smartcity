import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
   FAQData = [
      {
        'key': 'How to view Citizen records?',
        "value": "To View Citizen Records/Feedback Report:\n-Go to Dashboard > Click on Citizen Report > Click on view icon of any citizen you want to view,you can able to view the citizen Report.\n-Go to Dashboard > Click on FeedBack > Click on view icon of any feedback you want to view,you can able to view the feedback Report."
        
      },
      {
        'key': 'My reports tab is not working.',
        'value': 'Please fill the form at bottom of this page explaining your problem and submit your complaint. We will resolve it soonest.'
      },
      {
        'key': 'How to change Top Performing Ward names?',
        'value': 'You cannot change the top performing ward names. The top 3 wards with maximum complaints in closed status will automatically show up in this section.'
      },
      {
        'key': 'I cannot delete comment.',
        'value': 'Admin can delete comments of his own comments and of any citizen. You cannot delete other admin\'s comments.'
      },
      {
        'key': 'How to search complaint of a ward?',
        'value': 'To search complaint of a ward/Search Idea/Citizen Report/Complaint Report/Incident Report/Feedback Report:\n-Go to Dashboard->Click on Complaints Report->In Search bar enter the ward name you want to search,it will show the searched ward complaints.\n-Go to Dashboard->Click on Citizen Report->In Search bar enter the ward name you want to search ,it will show the searched ward citizens Reports.\n-Go to Dashboard->Click on Incident Report->In Search bar enter the ward name you want to search ,it will show the searched ward Incident Reports.\n-Go to Dashboard->Click on Feedback Report->In Search bar enter the ward name you want to search ,it will show the searched ward Feedback Reports.\n-Go to Dashboard->Click on Idea Submission Report->In Search bar enter the ward name you want to search ,it will show the searched ward Idea\'s.'
      },
      // {
      //   'key': 'Question 6',
      //   'value': 'Answer 6'
      // },
      // {
      //   'key': 'Question 7',
      //   'value': 'Answer 7'
      // },
      // {
      //   'key': 'Question 8',
      //   'value': 'Answer 8'
      // },
    ];
  panelOpenState = false;
  filtered_questions:any;
  helpCategoryData: any;
  popupLabel = 'Add New Poll';
  popupIcon = 'plus';
  currentDate = new Date();
  helpForm: FormGroup;
  userName: string = '';
  helpData: any;
  searchText:any;
  temp_string:any;
  url = 'http://164.52.208.77:3000/';
  constructor(

    private formBuilder: FormBuilder,
    private service: ApiService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.helpCategoryData = [
      {
        'key': '1',
        'value': 'Dashboard'
      },
      {
        'key': '2',
        'value': 'Facility Overview'
      },
      {
        'key': '3',
        'value': 'Donut Chart'
      },
      {
        'key': '4',
        'value': 'Idea Report'
      },
      {
        'key': '5',
        'value': 'Idea Details'
      },
      {
        'key': '6',
        'value': 'Citizen Report'
      },
      {
        'key': '7',
        'value': 'Citizen Details'
      },
      {
        'key': '8',
        'value': 'Complain Report'
      },
      {
        'key': '9',
        'value': 'Complaint Details'
      },
      {
        'key': '10',
        'value': 'Poll Report'
      },
      {
        'key': '11',
        'value': 'Poll Details'
      },
      {
        'key': '12',
        'value': 'Incident Report'
      },
      {
        'key': '13',
        'value': 'Incident Details'
      },
      {
        'key': '14',
        'value': 'Feedback Report'
      },
      {
        'key': '15',
        'value': 'Feedback Details'
      },
      {
        'key': '16',
        'value': 'Help'
      },
      {
        'key': '17',
        'value': 'Top Performing Ward'
      },
      {
        'key': '18',
        'value': 'Ward Needs Improvement'
      },
      {
        'key': '19',
        'value': 'Other'
      }
    ];


    this.initForm();

    this.filtered_questions=this.FAQData;
  }
  initForm() {
    let full_name = localStorage.getItem('full_name');
    this.helpForm = new FormGroup({
      'userName': new FormControl(full_name, [Validators.required]),
      'helpCategory': new FormControl('Select Category', [Validators.required]),
      'description': new FormControl(null, [Validators.required]),

    });

  }
  get f() { return this.helpForm.controls; }
  get today() { return new Date() }

  applyFilter(filterValue: string) {
    
		this.filtered_questions = this.FAQData.filter(e => e.key.toLowerCase().includes(filterValue.toLowerCase()));
    console.log('here', this.filtered_questions);
    this.methodFilterPredicate();
		// this.filtered_amenities=this.filtered_amenities.splice(0,24);
		// console.log("ame",this.filtered_amenities);
		// this.showSlides(this.slideIndex);
	}
  methodFilterPredicate(){
    console.log("inside filterPredicate start",this.filtered_questions)
    this.filtered_questions.filterPredicate =

    (data: any, filters: string) => {
      console.log("inside filterPredicate")
      const matchFilter:any = [];
      const filterArray = filters.split(' ');
      const columns = (<any>Object).values(data);
      console.log('array', filterArray);
    
      filterArray.forEach(filter => {
        const customFilter:any = [];
        console.log('column', columns);
        // columns.forEach((column:any) => customFilter.push(column.includes(filter)));
        columns.forEach((column:any) => { 
          console.log("column", column)
          customFilter.push(column && column.toString().toLowerCase().includes(filter))
      });
        matchFilter.push(customFilter.some(Boolean)); // OR
      });
      return matchFilter.every(Boolean); // AND toLowerCase()
    }
  }
  saveQuery() {
    let encrypt_username: any = localStorage.getItem('encrypt_username');
    let decrypt_username = CryptoJS.AES.decrypt(encrypt_username, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_id,
      'token': token,
    }
    let obj2 = {
      'name': this.helpForm.controls.userName.value,
      'email': decrypt_username,
      'category': this.helpForm.controls.helpCategory.value,
      'description': this.helpForm.controls.description.value,

    }

    let obj3 = {
      ...obj1, ...obj2
    }

    this.service.saveHelpQuery(obj3).subscribe(res => {
      this.toastrService.success('Query submitted successfully!');
      this.helpForm.controls.description.reset();
      this.helpForm.controls.helpCategory.reset();
    },
      error => {
        this.toastrService.warning('Oops! Something went wrong.');
      }
    )

  
  }
}
