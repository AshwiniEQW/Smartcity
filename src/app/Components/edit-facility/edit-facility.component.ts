import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MDBModalRef, MDBModalService, MdbTableDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { AddFacilityComponent } from '../add-facility/add-facility.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-edit-facility',
  templateUrl: './edit-facility.component.html',
  styleUrls: ['./edit-facility.component.css']
})
export class EditFacilityComponent implements OnInit {
  facilityData: any;

  searchText: string = '';


  user_id: any;
  token: any;
  DATA: any;

  facilityList: any;
  facilityColumns = ['facility_name', 'facility_type', 'longitude', 'latitude', 'actions']
  facilityTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<EditFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private modalService: MDBModalService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {

    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getFaclity();
  }

  getFaclity() {

    this.service.getFacility(this.DATA).subscribe((res) => {
      console.log(res);

      this.facilityList = res.data;
      this.facilityTableDataSource = new MatTableDataSource<any>(this.facilityList);
      this.facilityTableDataSource.sort = this.sort;
      this.facilityTableDataSource.paginator = this.paginator;

    });
  }
  methodFilterPredicate(){
    this.facilityTableDataSource.filterPredicate =

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
  onClose() {
    this.dialogRef.close();
  }

  addFacility(idArg: any) {
    let dialogRef = this.dialog.open(AddFacilityComponent, {
      width: '50%',
      data: idArg
    });

    dialogRef.afterClosed().subscribe(s => {

      this.getFaclity();
    });
  }

  deleteFaclity(idArg: any) {

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
      'location_id': id
    }
    this.service.deleteFacility(data).subscribe((res) => {
      this.toastrService.success('Facility Deleted!');
      this.getFaclity();
    });
  }

  applyFilter(filterValue: string) {
    this.facilityTableDataSource.filter = filterValue.trim();
    this.methodFilterPredicate();
  }

}
