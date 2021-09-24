import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFacilityComponent } from './Components/add-facility/add-facility.component';
import { AddPollComponent } from './Components/add-poll/add-poll.component';
import { ChatBotComponent } from './Components/chat-bot/chat-bot.component';
import { CitizenDetailsComponent } from './Components/citizen-details/citizen-details.component';
import { CitizenReportComponent } from './Components/citizen-report/citizen-report.component';
import { CitizenServicesComponent } from './Components/citizen-services/citizen-services.component';
import { ComplaintReportComponent } from './Components/complaint-report/complaint-report.component';
import { ComplaintSummaryComponent } from './Components/complaint-summary/complaint-summary.component';
import { ConfirmDeleteComponent } from './Components/confirm-delete/confirm-delete.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EditFacilityComponent } from './Components/edit-facility/edit-facility.component';
import { FacilityMapComponent } from './Components/facility-map/facility-map.component';
import { FacilityOverviewComponent } from './Components/facility-overview/facility-overview.component';
import { FeedbackDetailsComponent } from './Components/feedback-details/feedback-details.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { HelpComponent } from './Components/help/help.component';
import { IdeaSubmissionDetailsComponent } from './Components/idea-submission-details/idea-submission-details.component';
import { IdeaSubmissionReportComponent } from './Components/idea-submission-report/idea-submission-report.component';
import { IncidentDetailComponent } from './Components/incident-detail/incident-detail.component';

import { IncidentReportComponent } from './Components/incident-report/incident-report.component';
import { LoginComponent } from './Components/login/login.component';
import { PollAnalyticsReportComponent } from './Components/poll-analytics-report/poll-analytics-report.component';
import { PollReportComponent } from './Components/poll-report/poll-report.component';
import { SideBarComponent } from './Components/sideBar/side-bar.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path:'',component:LoginComponent},
  { path:'Login',component:LoginComponent},
  { path:'EditFacility',component:EditFacilityComponent},
  { path:'AddFacility',component:AddFacilityComponent},
  { path:'HomePage',component:SideBarComponent,canActivate: [AuthGuard]},
  { path:'Dashboard',component:DashboardComponent},
  {path:'IdeaDetails',component:IdeaSubmissionDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
                                IdeaSubmissionDetailsComponent,
                                SideBarComponent,
                                IdeaSubmissionDetailsComponent,
                                DashboardComponent,
                                FacilityOverviewComponent,
                                CitizenServicesComponent,
                                IdeaSubmissionReportComponent,
                                PollReportComponent,
                                ChatBotComponent,
                                CitizenReportComponent,
                                ComplaintReportComponent,
                                HelpComponent,
                                LoginComponent,
                                EditFacilityComponent,
                                AddFacilityComponent,
                                ConfirmDeleteComponent,
                                AddPollComponent,
                                FacilityMapComponent,
                                ComplaintSummaryComponent,
                                CitizenDetailsComponent,
                                IncidentReportComponent,
                                IncidentDetailComponent,
                                FeedbackComponent,
                                FeedbackDetailsComponent,
                                PollAnalyticsReportComponent
                              ]