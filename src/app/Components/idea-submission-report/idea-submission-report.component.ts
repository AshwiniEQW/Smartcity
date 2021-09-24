import { Component, OnInit,ViewChild } from '@angular/core';
import IdeaSubmissionReport, { ColoumnNames } from 'src/app/jsonFiles/IdeaSubmissionReport';
import {MatDialog} from '@angular/material/dialog';
import { IdeaSubmissionDetailsComponent } from '../idea-submission-details/idea-submission-details.component';
import { ApiService } from 'src/app/services/api.services';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
export interface IdeaSubmissionReportObject{
  [x: string]: any;
  iobj:any;
}
@Component({
  selector: 'app-idea-submission-report',
  templateUrl: './idea-submission-report.component.html',
  styleUrls: ['./idea-submission-report.component.css']
})

export class IdeaSubmissionReportComponent implements OnInit {
//IdeaSubmissionReport=IdeaSubmissionReport;
// id='';
searchText:any;
ideaList:any;
// maxRows=10;
// ideaList=[
  
//     {
//             "cardType": "",
//             "cardTitle": "",
//             "cardDescription": "",
//             "cardPostedOn": "",
//             "cardLastCommentedOn": null,
//             "cardPostedBy": "",
//             "cardPlace": null,
//             "cardProfileImage": null,
//             "threadId": "",
//             "status": "",
//             "cardUserId": ""
//         }
      
      

// ];
  user_id: any;
  token: any;
  DATA: any;
offset:any;
recordId:any;

ideaColumns = ['wardName', 'cardTitle', 'cardType','threadId', 'cardPostedOn','A']
  ideaTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor( public dialog: MatDialog,private service:ApiService,
    private toastrService:ToastrService,private messageService:ParentChildCommunicationService
    ) { }
    openDialog(IdeaSubmissionReportObject:any): void {
      const dialogRef = this.dialog.open(IdeaSubmissionDetailsComponent, {
        width: '70%',
        autoFocus: false,
       maxHeight: '90vh',
        data: {IdeaSubmissionReportObject}
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
       this.getIdeas();
      });
    }
 
  ngOnInit(): void {
 
 
 
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'recordId':1,
      // 'offset':100
    }
    this.getIdeas();
   
  }

  applyFilter(filterValue: string) {
    this.ideaTableDataSource.filter = filterValue.trim();
    this.methodFilterPredicate();
  }
  getIdeas()
  {
    this.service.GetIdeas(this.DATA).subscribe((res) => {
    //  console.log(res);

      this.ideaList = res.data;
      this.ideaList = res.data;
      this.ideaTableDataSource = new MatTableDataSource<any>(this.ideaList);
      this.ideaTableDataSource.sort = this.sort;
      this.ideaTableDataSource.paginator = this.paginator;
    // console.log("IDEA",this.ideaList);
    //  let ArrayLength = this.ideaList.length;
   
    //  if(ArrayLength<this.maxRows)
    //  {
    //    this.EndPageIndex=ArrayLength;
    //  }
    //  else
    //  {
    //    this.EndPageIndex=10;
    //  }
    //  this.PageNumbersAvailable = Math.ceil(ArrayLength / this.maxRows);
    //  this.PageNumbers = [];
    //  this.PageNumbers.length = this.PageNumbersAvailable + 1;

    });
    
  }
  methodFilterPredicate(){
    this.ideaTableDataSource.filterPredicate =

    (data: Element, filters: string) => {
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
  deleteIdea(ideaId:any){
    
    const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
      data:'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(ideaId);
    })
  }
 
  requestDelete(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_Id': user_id,
      'token': token,
      'thread_id': id
    }
    console.log("data delete",data);
    this.service.deleteIdea(data).subscribe((res) => {
      this.toastrService.success('Idea Deleted!');
      this.getIdeas();
    });
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i=0;
    this.messageService.OnSelect(i);
  }

}
