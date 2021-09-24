import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
//import { ChartModule } from 'angular2-chartjs';
//import 'chartjs-plugin-labels';
import 'chart.piecelabel.js';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
@Component({
  selector: 'app-citizen-services',
  templateUrl: './citizen-services.component.html',
  styleUrls: ['./citizen-services.component.css']
})
export class CitizenServicesComponent implements OnInit {
  user_id: any;
  token: any;
  DATA: any;
  donutDetails: any;
  msg:any;
 // isNoData:any=false;
  chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  constructor(private service: ApiService, private messageService: ParentChildCommunicationService) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'calender_period':1
    }
    this.getDonutDetails();
  }
  getDonutDetails() {
    this.service.getDonutDetails(this.DATA).subscribe((res) => {


      this.donutDetails = res.data;
      //console.log(this.donutDetails);
      this.chartLabels = this.donutDetails.label;
      this.chartDatasets = [
        { data: this.donutDetails.count, label: 'My First dataset' }
        // { data:[0,0, 0,0,0], label: 'My First dataset' },
        
      ];
      // console.log(this.donutDetails.label);
      // this.chartDatasets =this.donutDetails.count;
      //  this.chartDatasets=[
      //     { data: [200, 50, 100, 40, 120]}
      //   ];
    //  for(let i=0;i<5;i++){

      if(this.chartDatasets[0].data[0]==="0"&&this.chartDatasets[0].data[1]==="0"&&
      this.chartDatasets[0].data[2]==="0"&&this.chartDatasets[0].data[3]==="0"&&this.chartDatasets[0].data[4]==="0")
      {
       //  alert('no data');
       //this.isNoData=true;
       (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Week!";
           //  this.msg = document.getElementById('msg')?.innerText;
           //  this.msg.textContent="New";
 
      }

    //  }
    
    });



  }
  onDateChange(event:any){
   // console.log(event);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'calender_period':event
    }
    this.service.getDonutDetails(this.DATA).subscribe((res) => {


      this.donutDetails = res.data;
     
      this.chartLabels = this.donutDetails.label;
      this.chartDatasets = [
        // { data: [0, 0, 0,0,0], label: 'My First dataset' }
        { data: this.donutDetails.count, label: 'My First dataset' }
      ];
      if(this.chartDatasets[0].data[0]==="0"&&this.chartDatasets[0].data[1]==="0"&&
        this.chartDatasets[0].data[2]==="0"&&this.chartDatasets[0].data[3]==="0"&&this.chartDatasets[0].data[4]==="0"&&event==1)
      {
       //  alert('no data');
     //  this.
       (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Week!";
           //  this.msg = document.getElementById('msg')?.innerText;
           //  this.msg.textContent="New";
 
      }

      if(this.chartDatasets[0].data[0]==="0"&&this.chartDatasets[0].data[1]==="0"&&
      this.chartDatasets[0].data[2]==="0"&&this.chartDatasets[0].data[3]==="0"&&this.chartDatasets[0].data[4]==="0"&&event==2)
      {
       //  alert('no data');
       (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Month!";
           //  this.msg = document.getElementById('msg')?.innerText;
           //  this.msg.textContent="New";
 
      }

      if(this.chartDatasets[0].data[0]==="0"&&this.chartDatasets[0].data[1]==="0"&&
      this.chartDatasets[0].data[2]==="0"&&this.chartDatasets[0].data[3]==="0"&&this.chartDatasets[0].data[4]==="0"&&event==3)
      {
       //  alert('no data');
       (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Year!";
           //  this.msg = document.getElementById('msg')?.innerText;
           //  this.msg.textContent="New";
 
      }

 

    });
  }
  donutChart() { }
  public chartType: string = 'doughnut';

  // public chartDatasets: Array<any> = [
  //   { data: [200, 50, 100, 40, 120], label: 'My First dataset' }
  // ];

  // public chartLabels: Array<any> = ['Polls', 'Complaints', 'Feedback', 'Incidents', 'Ideas'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#009900',  '#ff1900','#ff6600' ,'#ffcc66','#00cc66' ],
      hoverBackgroundColor:  ['#009900',  '#ff1900','#ff6600' ,'#ffcc66','#00cc66' ],
      borderWidth: 0,
    }
  ];

  public chartOptions: any = {

    
    responsive: true,
    plugins: {
      // labels: {
      //   // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
       

      //   // precision for percentage, default is 0
     

      //   // identifies whether or not labels of value 0 are displayed, default is false
      //   showZero: true,
      // }
  },
  
    hover: {
      // onHover: function(e:any) {
      //   // $("#canvas1").css("cursor", e[0] ? "pointer" : "default");
        
         
      //     let el:any = document.getElementById("donutChart");
      //     //console.log("element value",el)
      //     el.style.cursor = e[0] ? "pointer" : "default";
        
      // }
      onHover: function(e:any, el:any) {    const section = el[0];    const currentStyle = e.currentTarget.style;    currentStyle.cursor = section ? 'pointer' : 'normal'; }
    },

    MouseEvent:
    {
        onmouseleave:function(e:any, el:any) {    const section = el[0];    const currentStyle = e.currentTarget.style;    currentStyle.cursor = section ? 'normal' : 'pointer'; }
    },
    legend: {
      position: 'bottom',
      
      labels: {
        boxWidth: 12,
        boxHeight: 25,
        padding: 40,
        font: {
          size: 25,
          family: 'Segoe UI'
        }
      }
    },
    pieceLabel: {
   
      
      render: function (args: any) {
        const label = args.label,
          value = args.value;
        return value;
      },


      fontSize: 13,
      fontStyle: 'bold',
      fontColor: '#37403a',
      fontFamily: '"Segoe UI", Monaco, monospace'
    
    },
    // plugins:{
    //   labels: {

    //     fontSize: 14,
    //     fontStyle: 'bold',
    //     fontColor: '#000',
    //     fontFamily: '"Lucida Console", Monaco, monospace'
    //   }
    // }
  };
  public chartClicked(e: any): void {
   
    e.active[0]._index

    switch (e.active[0]._index) {
      case 2:

        {
          let id = '1';
          let componentName = "IdeaSubmissionReport"
          this.messageService.setMessage(id, componentName);
          let i = 1;
          this.messageService.OnSelect(i);
        }
        break;
      case 3:

        {
          let id = '5';
          let componentName = "IncidentReport"
          this.messageService.setMessage(id, componentName);
          let i = 5;
          this.messageService.OnSelect(i);
        }

        break;

      case 1:
        {
          let id = '6';
          let componentName = "FeedbackReport"
          this.messageService.setMessage(id, componentName);
          let i = 6;
          this.messageService.OnSelect(i);
        }
        break;
      case 0:
        {
          let id = '3';
          let componentName = "ComplaintReport"
          this.messageService.setMessage(id, componentName);
          let i = 3;
          this.messageService.OnSelect(i);
        }
        break;
      case 4:
        {
          let id = '4';
          let componentName = "PollReport"
          this.messageService.setMessage(id, componentName);
          let i = 4;
          this.messageService.OnSelect(i);
        }
        break;

      default:
      

    }
  }
  public chartHovered(e: any): void {
  //   e.active[0]._index
  //   console.log(e.active[0]._index)
  //   if(e.active[0]._index){
  //      let el:any = document.getElementById("donutChart");
  //      e.active[0]._index.style.cursor =true ? "pointer" : "default";
  // //  e.target.style.cursor.onpointerenter = 'pointer';
  //   }
    
   }
}


