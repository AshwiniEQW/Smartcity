import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PollService {

     PollData=[
 
        {
            "id":101,
            "PollSubject":"If you could switch two movie characters, what switch would lead to the most inappropriate moviesfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff?",
            "SubmittedBy":"Ganesh Gupta",
            "SubmissionDate":"2021-07-21",
            "Status":"Active",
            "StartDate":"2021-07-22",
            "EndDate":"2021-07-26",
            "QuestionType":"multiple",
            "AnswerChoice":["dsfs","sdfs","Sdf","sdfs"]
        },
        {
            "id":102,
            "PollSubject":"What movie can you watch over and over without ever getting tired of?",
            "SubmittedBy":"Anusha Pandit",
            "SubmissionDate":"2021-07-22",
            "Status":"Active",
            "StartDate":"2021-07-24",
            "EndDate":"2021-07-29",
            "QuestionType":"multiple",
            "AnswerChoice":["sdf","sdf"]
      
        },
        {
            "id":103,
            "PollSubject":"If you couldn’t be convicted of any one type of crime, what criminal charge would you like to be immune to?",
            "SubmittedBy":"John Doe",
            "SubmissionDate":"2021-07-23",
            "Status":"Inactive",
            "StartDate":"2021-07-25",
            "EndDate":"2021-07-28",
            "QuestionType":"single",
            "AnswerChoice":["dsgsd"]
        }, 
        
        {
            "id":104,
            "PollSubject":"Where do you get your news?",
            "SubmittedBy":"Sumit Mehta",
            "SubmissionDate":"2021-07-24",
            "Status":"Inactive",
            "StartDate":"2021-07-25",
            "EndDate":"2021-07-30",
            "QuestionType":"single",
            "AnswerChoice":["fdgdf"]
        },
        {
            "id":105,
            "PollSubject":"What inanimate object would be the most annoying if it played loud upbeat music while being used?",
            "SubmittedBy":"Vinit Patil",
            "SubmissionDate":"2021-07-21",
            "Status":"Active",
            "StartDate":"2021-07-23",
            "EndDate":"2021-07-25",
            "QuestionType":"multiple",
            "AnswerChoice":["sdf","sdf","fsdf","Sdfs"]
        },
        
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Ganesh Gupta",
        //     "SubmissionDate":"24/7/2021",
        //     "Status":"Active",
        // },
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Anusha Pandit",
        //     "SubmissionDate":"21/6/2021",
        //     "Status":"Inactive",
      
        // },
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"John Doe",
        //     "SubmissionDate":"22/7/2021",
        //     "Status":"Active",
        // }, 
        
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Sumit Mehta",
        //     "SubmissionDate":"23/7/2021",
        //     "Status":"Inactive",
        // },
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Vinit Patil",
        //     "SubmissionDate":"22/7/2021",
        //     "Status":"Active",
        // },
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Sachin Gawda",
        //     "SubmissionDate":"28/7/2021",
        //     "Status":"Inactive",
        // },
    
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Anusha Pandit",
        //     "SubmissionDate":"21/6/2021",
        //     "Status":"Inactive",
      
        // },
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"John Doe",
        //     "SubmissionDate":"22/7/2021",
        //     "Status":"Active",
        // }, 
        
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Sumit Mehta",
        //     "SubmissionDate":"23/7/2021",
        //     "Status":"Inactive",
        // },
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Vinit Patil",
        //     "SubmissionDate":"22/7/2021",
        //     "Status":"Active",
        // },
        // {
            
        //     "PollSubject":"Reference About Louis,giving information,explaing date  sidod wdfsdi fsnidsdfnf",
        //     "SubmittedBy":"Sachin Gawda",
        //     "SubmissionDate":"28/7/2021",
        //     "Status":"Inactive",
        // },
       
    ];
  
  constructor() { }

  onGet()  {
  return this.PollData;
  }

  onAdd(newPoll:any){
    this.PollData.push(newPoll);
  }

//    onDelete(id:Number){
//    let user=this.users.find(x=>x.id===id);
//    let index=this.users.indexOf(user,0);
//    this.users.splice(index,1);
//    }
   
   onEdit(id:any,poll:any){
    let oldPoll:any;

    console.log("id:",id+"\n poll",poll)
     oldPoll=this.PollData.find(x=>x.id===id);
     oldPoll.PollSubject=poll.PollSubject;
     oldPoll.id=id;
    // oldUser.email=user.email;
    // oldUser.id=user.id;
    // let oldUser=this.users.find(x=>x.id===user.id);
    // oldUser.name=user.name;
    // oldUser.email=user.email;
    // oldUser.id=user.id;

   }
//    onGetUser(id:Number){
//       return this.users.find(x=>x.id===id);
//    }
  
}
