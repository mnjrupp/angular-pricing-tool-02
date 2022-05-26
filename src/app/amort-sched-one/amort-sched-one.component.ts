import { Component, OnInit } from '@angular/core';
import {LoanDataService} from '../shared/loan-data.service';
import {PricingModel} from '../pricing-model';

@Component({
  selector: 'app-amort-sched-one',
  templateUrl: './amort-sched-one.component.html',
  styleUrls: ['./amort-sched-one.component.css']
})
export class AmortSchedOneComponent implements OnInit {
  pricing:PricingModel;
  payments = [
    {paymentnum:0,payDate:new Date(),balance:0,payment:0.0,principal:0.0,interest:0.0,endbalance:0.0,cumulativeint:0.0}
  ]

  constructor(private loanservice:LoanDataService) {

   }

  ngOnInit() {
    this.loanservice.cast.subscribe(data=> this.pricing = data);
  }

  buildpayments(data:PricingModel){
    var TotalPayments  = data.loanProd1*data.paymentfreq;
    var Balance        = Number(data.loanAmnt);
    var schedPay       = data.PayAmnt1;
    var RecomRate      = data.RecomRate1;
    var PayDate        =  new Date(data.loanDate);
    var Principal      = 0.0;
    var Interest       = 0.0;
    var EndBalance     = 0.0;
    var CumInterest    = 0.0;

    if(TotalPayments>0){
      for(var i=0;i<TotalPayments;i++){
          
        this.payments.push({paymentnum:0,payDate:PayDate,balance:Balance,payment:0.0,principal:0.0,interest:0.0,endbalance:0.0,cumulativeint:0.0})
      }
    }




  }
}