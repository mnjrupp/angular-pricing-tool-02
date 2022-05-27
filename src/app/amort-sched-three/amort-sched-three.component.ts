import { Component, OnInit } from '@angular/core';
import { LoanDataService } from '../shared/loan-data.service';
import { PricingModel } from '../pricing-model';
import moment from 'moment';


@Component({
  selector: 'app-amort-sched-three',
  templateUrl: './amort-sched-three.component.html',
  styleUrls: ['./amort-sched-three.component.css']
})
export class AmortSchedThreeComponent implements OnInit {

  pricing: PricingModel;
  payments = [
    {
      paymentnum: '',
      payDate: '',
      balance: '',
      payment: '',
      principal: '',
      interest: '',
      endbalance: '',
      cumulativeint: '',
      TotalInt:0
    },
  ];
  constructor(private loanservice: LoanDataService) { }

  ngOnInit() {
    this.loanservice.cast.subscribe((data) => {
      this.pricing = data;
      this.payments = this.buildpayments(this.pricing);
      this.pricing.TotalInt3 = this.loanservice.formatCurrency(Math.max.apply(Math,this.payments.map(function(o)
      {return o.TotalInt;
      })))
    });
  }

  buildpayments(data: PricingModel) {
    var TotalPayments = data.loanProd3 * data.paymentfreq;
    var Balance = Number(this.loanservice.unformatNumber(data.loanAmnt));
    var schedPay = Number(this.loanservice.unformatNumber(data.PayAmnt3));
    var displayPay = this.loanservice.formatCurrency(schedPay);
    var RecomRate = Number(this.loanservice.unformatNumber(data.RecomRate3))/100;
    var PayDate = moment(data.loanDate).format('l');
    var Principal = '';
    var Interest = '';
    var EndBalance = '';
    var CumInterest = 0.0;
    var displayCum = '';
    var mPayments = [
      {
        paymentnum: '',
        payDate: '',
        balance: '',
        payment: '',
        principal: '',
        interest: '',
        endbalance: '',
        cumulativeint: '',
        TotalInt:0,
      },
    ];
    if (TotalPayments > 0 && Balance>0 && schedPay>0) {
      for (var i = 0; i < TotalPayments; i++) {
        Interest = this.loanservice.formatCurrency(
          Balance * (RecomRate / data.paymentfreq)
        );
        Principal = this.loanservice.formatCurrency(
          schedPay - Balance * (RecomRate / data.paymentfreq)
        );
        EndBalance = this.loanservice.formatCurrency(
          Balance - (schedPay - Balance * (RecomRate / data.paymentfreq))
        );
        CumInterest +=Number(this.loanservice.unformatNumber(Interest));
        displayCum = this.loanservice.formatCurrency(CumInterest);
        mPayments.push({
          paymentnum: (i + 1).toString(),
          payDate: PayDate,
          balance: this.loanservice.formatCurrency(Balance),
          payment: displayPay,
          principal: Principal,
          interest: Interest,
          endbalance: EndBalance,
          cumulativeint: displayCum,
          TotalInt:CumInterest
        });
    
        Balance =
          Number(this.loanservice.unformatNumber(EndBalance));
          // Compute the next payment date
          switch(Number(data.paymentfreq)){
            case 12:{
              PayDate = moment(PayDate).add(1,'month').format('l');
              break;
            }
            case 4:{
              console.log('Payment Date',PayDate)
              PayDate = moment(PayDate).add(3,'month').format('l');
              break;
            }
            case 1:{
              console.log('Payment Date',PayDate)
              PayDate = moment(PayDate).add(1,'y').format('l');
             break;
            }
            case 2:{
              console.log('Payment Date',PayDate)
              PayDate = moment(PayDate).add(6,'month').format('l');
             break;
            }
          }
      }
    }
   
    return mPayments;
  }

}