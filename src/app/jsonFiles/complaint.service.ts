import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

     ComplaintData=[
 
        {
            "Id":101,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":23245,
            "ComplaintType":"Potholes",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"Completed"
        },
        {
            "Id":102,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":33245,
            "ComplaintType":"Sewage System",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"Cancelled"
        },
        {
            "Id":103,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":23244,
            "ComplaintType":"Dustbeens not cleaned",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"In Progress"
        },   {
            "Id":104,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":24245,
            "ComplaintType":"Garbage vehicle not arrived",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"In Progress"
        },
        {
            "Id":105,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":23277,
            "ComplaintType":"Garbage dump",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"Completed"
        },
        {
            "Id":106,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":33246,
            "ComplaintType":"Sweeping not done",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"Completed"
        },   {
            "Id":107,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":28254,
            "ComplaintType":"Sewage System",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"Cancelled"
        },
        {
            "Id":108,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":26645,
            "ComplaintType":"Garbage dump",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"Cancelled"
        },
        {
            "Id":109,
            "Complaint":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
            "ComplaintId":21240,
            "ComplaintType":"Sweeping not don",
            "SubmittedBy":"Anusha Pandit",
            "SubmittedById":"12",
            "SubmissionDate":"2021-07-23",
            "Status":"In Progress"
        }
       
    ];
  
  constructor() { }

  onGet()  {
  return this.ComplaintData;
  }

//   onAdd(newPoll:any){
//     this.PollData.push(newPoll);
//   }

// //    onDelete(id:Number){
// //    let user=this.users.find(x=>x.id===id);
// //    let index=this.users.indexOf(user,0);
// //    this.users.splice(index,1);
// //    }
   
//    onEdit(id:any,poll:any){
//     let oldPoll:any;

//     console.log("id:",id+"\n poll",poll)
//      oldPoll=this.PollData.find(x=>x.id===id);
//      oldPoll.PollSubject=poll.PollSubject;
//      oldPoll.id=id;
//     // oldUser.email=user.email;
//     // oldUser.id=user.id;
//     // let oldUser=this.users.find(x=>x.id===user.id);
//     // oldUser.name=user.name;
//     // oldUser.email=user.email;
//     // oldUser.id=user.id;

//    }
// //    onGetUser(id:Number){
// //       return this.users.find(x=>x.id===id);
// //    }
  
}
