import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { Router } from '@angular/router';

import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { FeedbackDetailsComponent } from '../feedback-details/feedback-details.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {


  id = '';

  user_id: any;
  token: any;
  DATA: any;
  feedbackList: any;
  searchText: any;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  feedbackColumns = ['ward_name', 'feedbackfor', 'category', 'feedback_submission_date', 'feedback_rating', 'A']
  feedbackTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private service: ApiService,
    private toastr: ToastrService,
    private messageService: ParentChildCommunicationService,
    private router: Router) { }

  ngOnInit(): void {

    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }

    this.getFeedback();



  }


  openDialog(feedbackObject: any): void {
    console.log("inside parent", feedbackObject);
    const dialogRef = this.dialog.open(FeedbackDetailsComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: feedbackObject
    });

    dialogRef.afterClosed().subscribe(result => {
      //  this.getFeedback();
      this.router.navigate(['/HomePage']);
    });
  }

  methodFilterPredicate() {
    this.feedbackTableDataSource.filterPredicate =

      (data: Element, filters: string) => {
        console.log("inside filterPredicate")
        const matchFilter: any = [];
        const filterArray = filters.split(' ');
        const columns = (<any>Object).values(data);
        console.log('array', filterArray);

        filterArray.forEach(filter => {
          const customFilter: any = [];
          console.log('column', columns);
          // columns.forEach((column:any) => customFilter.push(column.includes(filter)));
          columns.forEach((column: any) => {
            console.log("column", column)
            customFilter.push(column && column.toString().toLowerCase().includes(filter))
          });
          matchFilter.push(customFilter.some(Boolean)); // OR
        });
        return matchFilter.every(Boolean); // AND toLowerCase()
      }
  }
  getFeedback() {
    this.service.getFeedback(this.DATA).subscribe((res) => {


      this.feedbackList = res.data;
      this.feedbackTableDataSource = new MatTableDataSource<any>(this.feedbackList);
      this.feedbackTableDataSource.sort = this.sort;

      const sortState: Sort = { active: 'ward_name', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      this.feedbackTableDataSource.paginator = this.paginator;

    });
  }


  deleteFeedback(feedbackId: any, feedbackFor: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(feedbackId, feedbackFor);
    })
  }

  requestDelete(feedbackId: any, feedbackFor: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'feedback_id': feedbackId,
      'feedbackfor': feedbackFor
    }
    console.log("obj", data);
    this.service.deleteFeedback(data).subscribe((res) => {
      this.toastr.success('Feedback Deleted!');
      this.getFeedback();
    });
  }

  applyFilter(filterValue: string) {
    this.feedbackTableDataSource.filter = filterValue.trim().toLowerCase();
    this.methodFilterPredicate();
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i = 0;
    this.messageService.OnSelect(i);
  }

}
