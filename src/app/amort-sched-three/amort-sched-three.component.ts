import { Component, OnInit } from '@angular/core';
import { LoanDataService } from '../shared/loan-data.service';
import { PricingModel } from '../pricing-model';
import {PaymentModel} from '../payment-model';
import {PaymentDataService} from '../shared/payment-data.service';



@Component({
  selector: 'app-amort-sched-three',
  templateUrl: './amort-sched-three.component.html',
  styleUrls: ['./amort-sched-three.component.css']
})
export class AmortSchedThreeComponent implements OnInit {

  pricing: PricingModel;
  payments:PaymentModel[] = [
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
      this.payments = this.paymentservice.buildpayments(this.pricing,3);
      this.pricing.TotalInt3 = this.loanservice.formatCurrency(Math.max.apply(Math,this.payments.map(function(o)
      {return o.TotalInt;
      })))
    });
  }

  

}