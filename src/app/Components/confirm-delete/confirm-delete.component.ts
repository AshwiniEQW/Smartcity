import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  message: string = this.data;
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>) {
      
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }


  ngOnInit(){

   // console.log(this.data);
      this.dialogRef.updateSize('20%','120px');
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  

}

// constructor(
//   private dialog: MatDialog,
//   private dialogRef: MatDialogRef<AddFacilityComponent>,
//   @Inject(MAT_DIALOG_DATA) public data: any,
//   private formBuilder: FormBuilder,
//   private service: ApiService,
//   private toastrService: ToastrService) { }
