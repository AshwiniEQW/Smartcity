import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.services';
import { CitizenDetailsComponent } from '../citizen-details/citizen-details.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';


export interface CitizenData {
  wards: string;
  full_name: string;
  registration_date: string;
  actions: string;
}
@Component({
  selector: 'app-citizen-report',
  templateUrl: './citizen-report.component.html',
  styleUrls: ['./citizen-report.component.css']
})
export class CitizenReportComponent implements OnInit {

  user_id: any;
  token: any;
  DATA: any;
  // Citizensdata: any;
  searchText: string = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  citizenList: any;
  citizenColumns = ['wards', 'full_name', 'registration_date', 'actions']
  citizenTableDataSource = new MatTableDataSource<Element>();

  // facilityTableDataSource = new MatTableDataSource<Element>();

  



  constructor(public dialog: MatDialog, private service: ApiService, private toastr: ToastrService,
    private messageService: ParentChildCommunicationService) {
      // this.user_id = localStorage.getItem('user_id');
      // this.token = localStorage.getItem('token');
  
      // this.DATA = {
      //   'user_id': this.user_id,
      //   'token': this.token
      // }
  
      // this.service.getCitizensReport(this.DATA).subscribe(res => {

      //   this.citizenList = res.data;
  
  
      //   this.citizenList = res.data;
      //   this.citizenTableDataSource = new MatTableDataSource<Element>(this.citizenList);
      //   this.citizenTableDataSource.sort = this.sort;
      //   this.citizenTableDataSource.paginator = this.paginator;
  
  
      // });
     
      // this.getCitizenData();

     }

     ngOnInit() {

      this.user_id = localStorage.getItem('user_id');
      this.token = localStorage.getItem('token');
      this.DATA = {
        'user_id': this.user_id,
        'token': this.token
      }
     this.getCitizenData();
    }

    methodFilterPredicate(){
      this.citizenTableDataSource.filterPredicate =

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
  getCitizenData() {
    this.service.getCitizensReport(this.DATA).subscribe(res => {

      this.citizenList = res.data;


      this.citizenList = res.data;
      this.citizenTableDataSource = new MatTableDataSource<Element>(this.citizenList);
      this.citizenTableDataSource.sort = this.sort;

      const sortState: Sort = { active: 'wards', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      this.citizenTableDataSource.paginator = this.paginator;


    });
  }
  // applyFilter(filterValue: string) {
  //   this.citizenTableDataSource.filter = filterValue.trim(); 
  // }
  applyFilter(event: Event) {
    console.log('in method')
   
    const filterValue = (event.target as HTMLInputElement).value;
    this.citizenTableDataSource.filter = filterValue.trim().toLowerCase();
    this.methodFilterPredicate();
    if (this.citizenTableDataSource.paginator) {
      this.citizenTableDataSource.paginator.firstPage();
    }
  }
  
  openDialog(details: any): void {

    const dialogRef = this.dialog.open(CitizenDetailsComponent, {
      width: '50%',
      data: details
    });

    dialogRef.afterClosed().subscribe(result => {
 

    });
  }



  deleteCitizen(idArg: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
      data:'Are you sure you want to delete?'})
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
      'citizen_user_id': id
    }
    console.log("obj", data);
    this.service.deleteCitizen(data).subscribe((res) => {
      this.toastr.success('Citizen Information Deleted!');
      this.getCitizenData();
    });
  }




  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i = 0;
    this.messageService.OnSelect(i);
  }


}
