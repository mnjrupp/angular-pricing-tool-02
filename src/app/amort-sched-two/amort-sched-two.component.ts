import { Component, OnInit } from '@angular/core';
import { LoanDataService } from '../shared/loan-data.service';
import { PricingModel } from '../pricing-model';
import {PaymentModel} from '../payment-model';
import {PaymentDataService} from '../shared/payment-data.service';


@Component({
  selector: 'app-amort-sched-two',
  templateUrl: './amort-sched-two.component.html',
  styleUrls: ['./amort-sched-two.component.css']
})
export class AmortSchedTwoComponent implements OnInit {

  pricing: PricingModel;
  payments:PaymentModel[]= [
    {
      paymentnum: '',
      payDate: '',
      balance: '',
      payment: '',
      principal: '',
      interest: '',
      endbalance: '',
      cumulativeint: '',
      cumpayment:0,
      TotalInt:0,
      AmorType:''
    },
  ];
  constructor(private loanservice: LoanDataService,private paymentservice:PaymentDataService) { }

  ngOnInit() {
    this.loanservice.cast.subscribe((data) => {
      this.pricing = data;
      this.payments = this.paymentservice.buildpayments(this.pricing,2);
      this.pricing.TotalInt2 = this.loanservice.formatCurrency(Math.max.apply(Math,this.payments.map(function(o)
      {return o.TotalInt;
      })))
    });
  }

  
}