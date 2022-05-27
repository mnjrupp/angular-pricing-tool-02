import { Component, OnInit } from '@angular/core';
import { LoanDataService } from '../shared/loan-data.service';
import { PricingModel } from '../pricing-model';
import moment from 'moment';

@Component({
  selector: 'app-amort-sched-one',
  templateUrl: './amort-sched-one.component.html',
  styleUrls: ['./amort-sched-one.component.css'],
})
export class AmortSchedOneComponent implements OnInit {
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
    },
  ];

  constructor(private loanservice: LoanDataService) {}

  ngOnInit() {
    this.loanservice.cast.subscribe((data) => {
      this.pricing = data;
      this.payments = this.buildpayments(this.pricing);
    });
  }

  buildpayments(data: PricingModel) {
    var TotalPayments = data.loanProd1 * data.paymentfreq;
    var Balance = Number(this.loanservice.unformatNumber(data.loanAmnt));
    var schedPay = Number(this.loanservice.unformatNumber(data.PayAmnt1));
    var displayPay = this.loanservice.formatCurrency(schedPay);
    var RecomRate = Number(this.loanservice.unformatNumber(data.RecomRate1));
    var PayDate = moment(data.loanDate).format('MM/DD/YYYY');
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
      },
    ];
    if (TotalPayments > 0 && Balance>0 && schedPay>0) {
      for (var i = 0; i < TotalPayments; i++) {
        Interest = this.loanservice.formatPercent(
          Balance * (RecomRate / data.paymentfreq)
        );
        Principal = this.loanservice.formatCurrency(
          schedPay - Balance * (RecomRate / data.paymentfreq)
        );
        EndBalance = this.loanservice.formatCurrency(
          Balance - (schedPay - Balance * (RecomRate / data.paymentfreq))
        );
        CumInterest += Balance * (RecomRate / data.paymentfreq);
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
        });
        console.log("Balance ",Balance)
        console.log('RecomRate ',RecomRate)

        Balance =
          Number(this.loanservice.unformatNumber(EndBalance));
      }
    }

    return mPayments;
  }
}
