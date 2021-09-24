import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdeaSubmissionReportComponent, IdeaSubmissionReportObject } from '../idea-submission-report/idea-submission-report.component';
import Details from '../../jsonFiles/IdeaSubmissionDetails';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-idea-submission-details',
  templateUrl: './idea-submission-details.component.html',
  styleUrls: ['./idea-submission-details.component.css']
})
export class IdeaSubmissionDetailsComponent implements OnInit {
  Details = Details;
  url='http://164.52.208.77:3000/';
  offset:number=0;
  ideaList = {
    "Image": null,
    "Name": "",
    "IdeaDescription": "",
    "IdeaNumber": 0,
    "Title": "",
    "SubmissionDate": "",
    "category_id": 0,
    "category_name":"",
    "ward_name":"",
    "attachment":"",
    "Comment": [
      {
        "Image": null,
        "PerconCommentId": 0,
        "Name": "",
        "CommentDescription": "",
        "IdeaNumber": 0,
        "DateOfComment": ""
      },
      {
        "Image": null,
        "PerconCommentId": 0,
        "Name": "",
        "CommentDescription": "",
        "IdeaNumber": 0,
        "DateOfComment": ""
      },
      {
        "Image": null,
        "PerconCommentId": 0,
        "Name": "",
        "CommentDescription": "",
        "IdeaNumber": 0,
        "DateOfComment": ""
      }
    ]
  };
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
  userComment: any;
  user_id: any;
  token: any;
  DATA: any;
  DATA1: any;
  user_name:any;
  idea_media:any;
  imgPath:any;
  count=0;
  getCommentLength:any;
  constructor(public dialogRef: MatDialogRef<IdeaSubmissionReportComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IdeaSubmissionReportObject, private service: ApiService,
    private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.user_name = localStorage.getItem('full_name');
    this.imgPath = localStorage.getItem('image');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getIdeaSummary();
  }
  OnClose() {
    this.dialogRef.close();
  }
  getIdeaSummary() {
    let is_admin:boolean=true;
    var id = this.data;
    this.offset=this.offset+3;
    // console.log("DATA",id.IdeaSubmissionReportObject);
    this.DATA1 = {
      'user_id': this.user_id,
      'token': this.token,
      'offset':this.offset,
      // 'is_admin':"true"
    }
    this.service.GetIdeaSummary(this.DATA1, id.IdeaSubmissionReportObject,is_admin).subscribe((res) => {
      // console.log(res);
      
      this.ideaList = res.Details;
      this.getCommentLength=this.ideaList.Comment.length;
      console.log("ideaList", this.ideaList);


      this.idea_media=this.ideaList.attachment;
      //if(this.complaint_media)
      console.log('at',typeof this.idea_media.attachment)
      this.downloadText= (this.idea_media.length == 0)?"No attachments available":"Download all attachments";

      console.log(this.thumbnailArray);

      if(this.idea_media.attachment !== undefined || this.idea_media.attachment !== null &&this.count==0)
      this.getThumbnails();

    });

  }
  // getCommntLength(){
  //   if(this.getCommentLength>3)
  //   return true;
  //   else 
  //   return false;
  // }

  getThumbnails(){
    this.count++;
    console.log(this.idea_media.length);
    for(let i=0;i<this.idea_media.length;i++){
      let path=this.idea_media[i].attachment;
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
  addIdeaComment() {

    let parent_thread_id = this.data.IdeaSubmissionReportObject;
    let idea_cat_id = this.ideaList.category_id;
    let user_Id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_Id': user_Id,
      'token': token,
      
    }
    let obj2 = {
      'parent_thread_id': parent_thread_id,
      'idea_cat_id': idea_cat_id,
      'description':this.userComment

    }
    let obj3 = {
      ...obj1, ...obj2
    }

    console.log(obj3);

    console.log(obj3);
    if(this.userComment==''||this.userComment=='\n'||this.userComment=='\t')
    this.toastrService.warning('Plz leave your comment!');

    else{
      this.service.AddIdeaComment(obj3).subscribe(res => {
        this.toastrService.success('Comment added successfully!');
        this.getIdeaSummary();
      },
        error => {
          this.toastrService.warning('Oops! Something went wrong.');
        }
      )
      this.userComment = '';
    }

    this.userComment = '';

  }
  deleteIdeaComment(commentId: any,adminFlag:boolean,commentUserId:any) {
    console.log("comment Id", commentId);
    if(adminFlag == false || this.user_id == commentUserId){
      const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
        data:'Are you sure you want to delete?'
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
      'response_Id': id
    }
    this.service.DeleteIdeaComment(data).subscribe((res) => {
      this.toastrService.success('Comment Deleted!');
      this.getIdeaSummary();
    });
  }
}
