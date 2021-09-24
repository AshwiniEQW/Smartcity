import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ReportSideBarElement from 'src/app/jsonFiles/ReportSideBar';

@Injectable({
  providedIn: 'root'
})
export class ParentChildCommunicationService {
  public id = new Subject<string>();
  public componentName = new Subject<string>();
  indexOf: number=0;
  reports=ReportSideBarElement;

  constructor() { }
  setMessage(value:string,value2:string) {
    this.id.next(value);
    this.componentName.next(value2);

  }
  OnSelect(i: number) {
    this.indexOf = i;
    for (var icnt = 0; icnt < 7; icnt++) {


      if (icnt == this.indexOf)
        this.reports[icnt].renderVariable = "true";
      else
        this.reports[icnt].renderVariable = "false";

    }

  }
}
