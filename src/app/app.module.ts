import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ApiService } from './services/api.services';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
// For MDB Angular Free
import { ChartsModule, WavesModule, ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddPollComponent } from './Components/add-poll/add-poll.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PollService } from './jsonFiles/poll.service';
import { ComplaintService } from './jsonFiles/complaint.service';
import { DatePipe } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AddPollComponent,
   
 
    
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-center",
      preventDuplicates: false
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,MatCheckboxModule,
    AlertModule,
    MDBBootstrapModule.forRoot(),
    NgApexchartsModule,
    MatCardModule,
    MatExpansionModule,
    HttpClientModule,
    FormsModule,
    
    ReactiveFormsModule,
    ModalModule, TooltipModule, PopoverModule, ButtonsModule,
    MatIconModule,
    MatDialogModule,
    ChartsModule, WavesModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatRadioModule, MatDividerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
    
      positionClass: 'toast-top-center',
      "preventDuplicates": true,

      
    
    }),
    
    // MatFormFieldModule,

  ],
  providers: [CookieService,ApiService,PollService,ComplaintService,DatePipe,{provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
