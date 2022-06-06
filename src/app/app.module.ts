import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


import { NavMenuComponent } from './nav-menu/nav-menu.component';
//import { HomeComponent } from './home/home.component';
import { LoanOfficerComponent } from './loanofficer/loanofficer.component';
import { CustomerComponent } from './customer/customer.component';
import {AmortSchedOneComponent} from './amort-sched-one/amort-sched-one.component';
import {AmortSchedTwoComponent} from './amort-sched-two/amort-sched-two.component';
import {AmortSchedThreeComponent} from './amort-sched-three/amort-sched-three.component';
import {PaymentCompareComponent} from './charts/payment-compare/payment-compare.component';
import {InterestCompareComponent} from './charts/interest-compare/interest-compare.component';
import {RateCalculatorComponent} from './rate-calculator/rate-calculator.component';
import {LoanDataService } from './shared/loan-data.service';
import {GlobalDataService} from './shared/global-data.service';
import {PaymentDataService} from './shared/payment-data.service';

@NgModule({
  imports:      [ BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
     FormsModule,
     HttpClientModule,
     ReactiveFormsModule,
     RouterModule.forRoot([
       { path: '', component: LoanOfficerComponent, pathMatch: 'full' },
       //{ path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
       { path: 'loanofficer', component: LoanOfficerComponent },
       {path: 'customer',component:CustomerComponent},
       {path:'AmortSchedOne',component:AmortSchedOneComponent},
       {path:'AmortSchedTwo',component:AmortSchedTwoComponent},
       {path:'AmortSchedThree',component:AmortSchedThreeComponent},
       {path:'PaymentsCompare',component:PaymentCompareComponent},
       {path:'InterestCompare',component:InterestCompareComponent},
       {path:'RateCalc',component:RateCalculatorComponent }
     ]) ],

  declarations: [ 
    AppComponent ,
    NavMenuComponent,
    LoanOfficerComponent,
    CustomerComponent,
    AmortSchedOneComponent,
    AmortSchedTwoComponent,
    AmortSchedThreeComponent,
    PaymentCompareComponent,
    InterestCompareComponent,
    RateCalculatorComponent],
   providers:[LoanDataService,GlobalDataService,PaymentDataService],
  bootstrap:[ AppComponent ]
})
export class AppModule { }
