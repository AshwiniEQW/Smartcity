import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddPollComponent } from '../add-poll/add-poll.component';
import PollReport, { PollColoumnNames } from 'src/app/jsonFiles/pollReport';
import { ApiService } from 'src/app/services/api.services';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PollService } from 'src/app/jsonFiles/poll.service';
import { ComplaintSummaryComponent } from '../complaint-summary/complaint-summary.component';
import { ComplaintService } from 'src/app/jsonFiles/complaint.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-complaint-report',
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.css']
})
export class ComplaintReportComponent implements OnInit {

  //ComplaintReport = this.complaintService.onGet();
  id = '';
  
  user_id: any;
  token: any;
  DATA: any;
  complaintList:any;
  searchText:any;
  // maxRows = 8;
  // PageNumbersAvailable: number = 0;
  // PageNumbers: any;
  // CurrentPageNumber: number = 1;
  // StartPageIndex: number = 0;
  // EndPageIndex: number = this.maxRows;
  // flag = 0;
  // PollColumnName = PollColoumnNames;
  complaintColumns = ['ward_name','complaint_subject', 'complaint_id', 'complaint_type',  'submission_date','status','A']
  complaintTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private service: ApiService,
    private toastr:ToastrService,
    private complaintService:ComplaintService,
    private messageService:ParentChildCommunicationService,
    private router:Router) { }

  ngOnInit(): void {
    
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getComplaint();
    
  }


  openDialog(ComplaintObject: any): void {
    console.log("inside parent",ComplaintObject);
    const dialogRef = this.dialog.open(ComplaintSummaryComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ComplaintObject
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getComplaint();
     this.router.navigate(['/HomePage']);
    });
  }
  
  methodFilterPredicate(){
    this.complaintTableDataSource.filterPredicate =

    (data: Element, filters: string) => {
      console.log("data",data)
      console.log("filters",filters)
      const matchFilter:any = [];
      const filterArray = filters.split(' ');
      const columns = (<any>Object).values(data);
      //console.log('array', filterArray);
    
      filterArray.forEach(filter => {
        const customFilter:any = [];
       // console.log('column', columns);
        // columns.forEach((column:any) => customFilter.push(column.includes(filter)));
        columns.forEach((column:any) => { 
         // console.log("column", column)
          customFilter.push(column && column.toString().toLowerCase().includes(filter))
      });
        matchFilter.push(customFilter.some(Boolean)); // OR
      });
      return matchFilter.every(Boolean); // AND toLowerCase()
    }
  }
  getComplaint() {
    this.service.getComplaint(this.DATA).subscribe((res) => {

   
      this.complaintList = res.data;
      this.complaintTableDataSource = new MatTableDataSource<any>(this.complaintList);
      this.complaintTableDataSource.sort = this.sort;
      this.complaintTableDataSource.paginator = this.paginator;

    });
  }
  // nextPage() {
  //   if (this.CurrentPageNumber < this.PageNumbersAvailable) {
  //     this.CurrentPageNumber = this.CurrentPageNumber + 1;
  //     this.StartPageIndex = this.StartPageIndex + this.maxRows;
  //     this.EndPageIndex = this.EndPageIndex + this.maxRows;
  //     this.flag = 0;
  //   }
  //   else {
  //     this.toastr.warning("No more records exist!");
  //   }

  // }

  // previousPage() {
  //   if (this.CurrentPageNumber > 1) {
  //     this.CurrentPageNumber = this.CurrentPageNumber - 1;
  //     this.StartPageIndex = this.StartPageIndex - this.maxRows;
  //     this.EndPageIndex = this.EndPageIndex - this.maxRows;
  //     this.flag = 0;
  //   }
  //   else {

  //   }

  // }

  deleteComplaint(idArg: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
      data:'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(idArg);
    })
  }

  requestDelete(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'complaint_id': id
    }
    console.log("obj",data);
    this.service.deleteComplaint(data).subscribe((res) => {
      this.toastr.success('Complaint Deleted!');
      this.getComplaint();
    });
  }

  applyFilter(filterValue: string) {
    this.complaintTableDataSource.filter = filterValue.trim().toLowerCase();
    this.methodFilterPredicate();
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i=0;
    this.messageService.OnSelect(i);
  }

}
