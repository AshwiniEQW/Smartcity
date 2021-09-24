import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
@Injectable({
    providedIn: 'root'
})

export class ApiService {
    expressApiUrl = "http://164.52.208.77:3000";
    invokeFirstComponentFunction = new EventEmitter();
    //subsVar: Subscription;
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': ''
        })
    };

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = "Something went wrong!"
        }
        return throwError(errorMessage);
    }
    login(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/smartcity/adminlogin', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    getCitizenCount(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/citizen/GetCitizenCount', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFacilityCount(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/facilitycount', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFacility(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/getFacility', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFacilityId(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/facilitybyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    addFacility(formData:any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/newFacility',formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    updateFacility(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/updateFacility', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    deleteFacility(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/deleteFacility', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    getFacilityByID(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facilitytype/getFacilityType', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    GetIdeas(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/ideas/GetIdeas', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteIdea(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/ideas/DeleteIdea', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    GetIdeaSummary(formData: any,id:any,is_admin:boolean): Observable<any> {
        
        return this.http.post(this.expressApiUrl + '/ideas/GetIdeaSummary/'+id+'/'+is_admin, formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    DeleteIdeaComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/ideas/DeleteIdeaResponse', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    AddIdeaComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/ideas/AddIdeaResponse', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    getPoll(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/getPoll', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getPollById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/getpollid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getPollCategory(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/getpollcategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    addPoll(formData:any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/addPoll',formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    updatePoll(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/updatePoll', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deletePoll(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/deletepoll', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaint(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getComplaint', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaintStatus(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getComplaintStatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaintById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getComplaintSummarybyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    AddComplaintComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/addcomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    DeleteComplaintComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/deletecomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    updateComplaintStatus(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/updateComplaintStatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteComplaint(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/deleteComplaint', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
  
    getTopWard(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/smartcity/gettopward', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getLessWard(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/smartcity/getlessward', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getCitizenByID(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/citizenreport/getcitizenbyid/', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
 
    getCitizensReport(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/citizenreport/getcitizenreport/', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteCitizen(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/citizenreport/deletecitizen', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getIncident(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getincident', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteIncident(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/deleteincident', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getIncidentById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getincidentbyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getIncidentStatus(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getincidentstatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    updateIncidentStatus(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/updateincidentstatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    AddIncidentComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/addincidentcomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    DeleteIncidentComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/deleteincidentcomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFeedback(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/feedback/getfeedback', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteFeedback(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/feedback/deletefeedback', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFeedbackById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/feedback/getFeedbackbyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getDonutDetails(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/donut/donutdetails', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    saveHelpQuery(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/help/helpemail', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
}
