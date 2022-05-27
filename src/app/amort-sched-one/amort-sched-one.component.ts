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
    var RecomRate = Number(this.loanservice.unformatNumber(data.RecomRate1))/100;
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
        });
        /*console.log("Balance ",Balance)
        console.log('RecomRate ',RecomRate)
        console.log('Principal ',Principal)*/
        //console.log('Payment Frequency ',data.paymentfreq)
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
    this.pricing.TotalInt1 = displayCum;
    this.loanservice.editModel(this.pricing);
    return mPayments;
  }
}
