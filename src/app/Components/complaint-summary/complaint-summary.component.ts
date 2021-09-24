import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-complaint-summary',
  templateUrl: './complaint-summary.component.html',
  styleUrls: ['./complaint-summary.component.css']
})
export class ComplaintSummaryComponent implements OnInit {

  complaintData: any;
  complaint_media:any;
  user_id: any;
  token: any;
  obj1: any;
  obj3: any;
  userComment: any;
  selected: any;
  selectedStatus: any;
  url = 'http://164.52.208.77:3000/';
  complaintStatus: any;
  offset: number = 0;
  getCommentLength: any;
  offsetStatus: any;
  user_name: any;
  imgPath: any;
  uploadFiles:any;
  thumbnailArray:string[]=[];
  downloadText:any;
  iconList = [
    { type: 'png', icon: 'fa fa-file-image-o' },
    { type: 'pdf', icon: 'fa fa-file-pdf-o' },
    { type: 'jpg', icon: 'fa fa-file-image-o' },
    { type: 'jpeg', icon: 'fa fa-file-image-o' },
    { type: 'mp4', icon: 'fa fa-file-video-o' },
    { type: 'mpeg', icon: 'fa fa-file-video-o' },
    { type: 'jfif', icon: 'fa fa-file-image-o' },
    { type: 'doc', icon: 'fa fa-file-word-o' },
    { type: 'docx', icon: 'fa fa-file-word-o' },
    { type: 'xlsx', icon: 'fa fa-file-excel-o' },
    { type: 'xls', icon: 'fa fa-file-excel-o' },
    { type: 'txt', icon: 'fa fa-file-text-o' },
  ];
  count=0;
  // complaintStatus = [

  //   {
  //     'key': '1',
  //     'value': 'Open'
  //   },
  //   {
  //     'key': '2',
  //     'value': 'In Progress'
  //   },
  //   {
  //     'key': '3',
  //     'value': 'Closed'
  //   },
  //   {
  //     'key': '4',
  //     'value': 'Rejected'
  //   },
  // ];
  constructor(public dialogRef: MatDialogRef<ComplaintSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private toastr: ToastrService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private http:HttpClient) { }


  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.user_name = localStorage.getItem('full_name');
    this.imgPath = localStorage.getItem('image');
    this.obj1 = {
      'user_id': this.user_id,
      'token': this.token,
    }
    this.getComplaintStatus();
    this.getComplaintDetails();

  }

  getComplaintStatus() {
    this.service.getComplaintStatus(this.obj1).subscribe(res => {
      this.complaintStatus = res.data;

      //console.log(this.selected[0].key);

    });
  }
  getComplaintDetails() {
   
    this.offset = this.offset + 3;
    let obj2 = {

      'complaint_id': this.data.complaint_id,
      'offset': this.offset,
      'is_admin':"true"
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
    this.service.getComplaintById(obj3).subscribe(res => {
      this.complaintData = res.data[0];

      
      this.complaint_media=this.complaintData.complaint_media;
      //if(this.complaint_media)
      console.log('at',this.complaint_media[0].complaint_media_file)
      this.downloadText= (this.complaint_media[0].complaint_media_file === null)?"No attachments available":"Download all attachments";

      console.log(this.thumbnailArray);
      
     
    
   

    //  this.getCommentLength = this.complaintData.comments.length;


      if (this.complaintStatus) {
        this.selected = this.complaintStatus.filter((sta: any) => sta.status_name == this.complaintData.ComplaintStatus)
        console.log(this.selected[0].complaint_status_id);
        this.selectedStatus = this.selected[0].complaint_status_id;
      }

      if(this.complaint_media[0].complaint_media_file !== null&&this.count==0)
      this.getThumbnails();
    });


  }

  getThumbnails(){
    this.count++;
    console.log(this.complaint_media.length);
    for(let i=0;i<this.complaint_media.length;i++){
      let path=this.complaint_media[i].complaint_media_file;
      //console.log("media",path);
      //path.split("/").pop();
      let filepath:string=path.substr(path.lastIndexOf('/') + 1);
     // console.log("media",filepath);
      this.thumbnailArray.push(filepath);
    }

  }
  getFileExtension(filename:any) {
    let ext = filename.split('.').pop();
    let obj = this.iconList.filter(row => {
      if (row.type === ext) {
        return true;
      }
      else 
      return false;
    });
    if (obj.length > 0) {
      let icon = obj[0].icon;
      return icon;
    } else {
      return '';
    }
  }
  onStatusChange(event: any) {

    console.log(event);
    this.obj3 = {

      'complaint_id': this.data.complaint_id,
      'complaint_status_id': event
    }
  }
  updateComplaintStatus() {

    let obj = {
      ...this.obj1, ...this.obj3
    }

    console.log(obj);
    this.service.updateComplaintStatus(obj).subscribe(res => {
      this.toastr.success("Complaint Status Updated!");
      this.onClose();
    });
  }
  onClose() {
    this.dialogRef.close();
  }


  addComplaintComment() {

    let idea_cat_id = this.complaintData.category_id;
    let user_Id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_Id,
      'token': token
    }
    let obj2 = {
      'thread_id': this.complaintData.complaint_id,
      'complaint_cat_id': this.complaintData.complaint_cat_id,
      'comments': this.userComment


    }

    let obj3 = {
      ...obj1, ...obj2
    }

    console.log(obj3);
    if (this.userComment == '' || this.userComment == '\n' || this.userComment == '\t')
      this.toastrService.warning('Plz leave your comment!');

    else {
      console.log("usercomment", this.userComment);
      this.service.AddComplaintComment(obj3).subscribe(res => {
        this.toastrService.success('Comment added successfully!');
        this.getComplaintDetails();
      },
        error => {
          this.toastrService.warning('Oops! Something went wrong.');
        }
      )
      this.userComment = '';
    }

  }
  downloadZip(docUrl:any) {
    let url1=this.url+docUrl[0].complaint_media_file;
    let url2=this.url+docUrl[1].complaint_media_file;
    let url3=this.url+docUrl[2].complaint_media_file;
    let urls=[url1,url2,url3];


    urls.forEach(function(url){
      var filename = "filename";
      // loading a file and add it in a zip file
      // JSZipUtils.getBinaryContent(url, function (err, data) {
      //    if(err) {
      //       throw err; // or handle the error
      //    }
      //    zip.file(filename, data, {binary:true});
      //    count++;
      //    if (count == urls.length) {
      //      var zipFile = zip.generate({type: "blob"});
      //      saveAs(zipFile, zipFilename);
      //    }
      // });
    });
    


    this.loadData(url2,
    this.saveAsZip);
  }

  private loadData(url:any, callback: Function) : void{
    this.http.get(url, { responseType: "arraybuffer" })
             .subscribe(x => callback(x));
  }

  private saveAsZip(content: Blob) : void{
    let zip = new JSZip();
 
    zip.file("issue.mp4", content);
    zip.generateAsync({ type: "blob" })
       .then(blob => saveAs(blob,'SmartCity.zip'));
  };
  downloadDocument(docUrl:any){
    console.log(docUrl[0].complaint_media_file)
     let url=this.url+docUrl[0].complaint_media_file;
		// const link = document.createElement('a');
     console.log(url);
  
    // link.setAttribute('target', '_blank');
		// link.setAttribute('href', url);
		// link.setAttribute('download', 'img.png');
		// link.style.visibility = 'hidden';
		// document.body.appendChild(link);
		// link.click();
    // link.remove();
		// //document.body.removeChild(link);
     
      let zip = new JSZip();
      zip.file("my_file.png",url, { base64: true } );
   //   zip.file("profile.png", url);
     //let imgFolder:any = zip.folder("images");
    // for (let i = 0; i < this.uploadFiles?.length; i++) {
    // imgFolder.file(this.uploadFiles[i].name, this.uploadFiles[i], { base64: true });
    // }
    zip.generateAsync({ type: "blob" })
    .then(function (content) {
    FileSaver.saveAs(content, "SmartCity.zip");
     });
 // }
	//	this.toastrService.success('Document Started Downloading!');

	}
  deleteComplaintComment(commentId: any, isAdmin: boolean, commentUserId: any) {
    if (isAdmin==false || commentUserId == this.user_id) {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        data: 'Are you sure you want to delete?'
      })
      dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
        if (showSnackBar) this.requestDelete(commentId);
      })
    }
    else
    this.toastrService.warning("Sorry! You can't delete this comment!");
  }


  requestDelete(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'comment_thread_id': id
    }
    this.service.DeleteComplaintComment(data).subscribe((res) => {
      if (res.status)
        this.toastrService.success('Comment Deleted!');
      else
        this.toastrService.warning('Oops! Something went wrong.');

      this.getComplaintDetails();
    });
  }
}
