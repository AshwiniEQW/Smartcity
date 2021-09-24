import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import 'chartjs-plugin-labels';
import 'chart.piecelabel.js';
@Component({
  selector: 'app-poll-analytics-report',
  templateUrl: './poll-analytics-report.component.html',
  styleUrls: ['./poll-analytics-report.component.css']
})
export class PollAnalyticsReportComponent implements OnInit {


  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [80, 81, 56, 55, 40, 78, 38, 75, 98, 50], label: '' }
  ];
  //label: ['Option 1','Option 2','Option 3','Option 4','Option 5','Option 6','Option 7','Option 8', 'Option 9', 'Option 10']
  public chartLabels: Array<any> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',

        
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        label:10
      ,
        font: {
          weight: 'bold'
        }
      }
    },
    legend: {
      display: false,
    },
    

    
   

    
    tooltips: {
      titleFontSize: 15,
      bodyFontSize: 15,
      custom: function(tooltip:any) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function (tooltipItem: any, data: any) {
          console.log("index", tooltipItem, "\t", "data:", data);
          let dataset = [{
            data: ['Option 1 ','Option 2 ','Option 3 ','Option 4 ','Option 5 ','Option 6 ','Option 7 ','Option 8 ', 'Option 9 ', 'Option 10 ']
          }];
          return dataset[0].data[tooltipItem.index] + ": " + tooltipItem.value;
          // console.log("index", tooltipItem,"\t","data:",data);
          // return "option";
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontSize: 16,
          fontColor: "Black",
          defaultFontFamily: "Segoe UI",
          maxTicksLimit: 6
        },
        scaleLabel: {
          display: true,
          labelString: 'Votes',
          fontSize: 22,
          fontColor: "Black",
          defaultFontFamily: "Segoe UI",
        }
      }],
      xAxes: [{
        ticks: {

          fontSize: 16,
          fontColor: "Black",
          defaultFontFamily: "Segoe UI",
        },
        scaleLabel: {
          display: true,
          labelString: 'Answer Choices',
          fontSize: 22,
          fontColor: "Black",
          defaultFontFamily: "Segoe UI",
        }
      }]
    }
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  constructor(public dialogRef: MatDialogRef<PollAnalyticsReportComponent>) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }
}
