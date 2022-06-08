import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaymentModel } from '../payment-model';
import { PricingModel } from '../pricing-model';
import moment from 'moment';

@Injectable()
export class PaymentDataService {
  paymentmodel: PaymentModel[] = [
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
      TotalInt: 0,
      AmorType: '',
    },
  ];

  private payments = new BehaviorSubject<PaymentModel[]>(this.paymentmodel);

  cast = this.payments.asObservable();
  constructor() {}

  editModel(newModel) {
    this.payments.next(newModel);
  }

  buildpayments(data: PricingModel, scenario: number) {
    var TotalPayments;
    var Amorttype;
    var schedPay;
    var RecomRate;
    switch (scenario) {
      case 1:
        TotalPayments = data.loanProd1 * data.paymentfreq;
        Amorttype = data.AmorType1;
        schedPay  = Number(this.unformatNumber(data.PayAmnt1));
        RecomRate = Number(this.unformatNumber(data.RecomRate1))/100;
        break;
      case 2:
        TotalPayments = data.loanProd2 * data.paymentfreq;
        Amorttype = data.AmorType2;
        schedPay  = Number(this.unformatNumber(data.PayAmnt2));
        RecomRate = Number(this.unformatNumber(data.RecomRate2))/100;
        break;
      case 3:
        TotalPayments = data.loanProd3 * data.paymentfreq;
        Amorttype = data.AmorType3;
        schedPay  = Number(this.unformatNumber(data.PayAmnt3));
        RecomRate = Number(this.unformatNumber(data.RecomRate3))/100;
    }
    
   
    var Balance = Number(this.unformatNumber(data.loanAmnt));

    

    var displayPay = this.formatCurrency(schedPay);

    

    //Number(this.unformatNumber(data.RecomRate1))/100;
    var PayDate = moment(data.loanDate).format('l');
    var Principal = '';
    var Interest = '';
    var EndBalance = '';
    var CumInterest = 0.0;
    var CumPayment = 0.0;
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
        cumpayment:0,
        TotalInt: 0,
        AmorType: '',
      },
    ];
    if (TotalPayments > 0 && Balance > 0 && schedPay > 0) {
      for (var i = 0; i < TotalPayments; i++) {
        Interest = this.formatCurrency(
          Balance * (RecomRate / data.paymentfreq)
        );
        Principal = this.formatCurrency(
          schedPay - Balance * (RecomRate / data.paymentfreq)
        );
        EndBalance = this.formatCurrency(
          Balance -
            (schedPay -
              Balance * (RecomRate / data.paymentfreq))
        );
        CumPayment += schedPay;
        CumInterest += Number(this.unformatNumber(Interest));
        displayCum = this.formatCurrency(CumInterest);
        mPayments.push({
          paymentnum: (i + 1).toString(),
          payDate: PayDate,
          balance: this.formatCurrency(Balance),
          payment: displayPay,
          principal: Principal,
          interest: Interest,
          endbalance: EndBalance,
          cumulativeint: displayCum,
          cumpayment:CumPayment,
          TotalInt: CumInterest,
          AmorType: Amorttype.toString(),
        });

        Balance = Number(this.unformatNumber(EndBalance));
        // Compute the next payment date
        switch (Number(data.paymentfreq)) {
          case 12: {
            PayDate = moment(PayDate).add(1, 'month').format('l');
            break;
          }
          case 4: {
            console.log('Payment Date', PayDate);
            PayDate = moment(PayDate).add(3, 'month').format('l');
            break;
          }
          case 1: {
            console.log('Payment Date', PayDate);
            PayDate = moment(PayDate).add(1, 'y').format('l');
            break;
          }
          case 2: {
            console.log('Payment Date', PayDate);
            PayDate = moment(PayDate).add(6, 'month').format('l');
            break;
          }
        }
      }
    }
    //console.log('payment-service ', mPayments);
    return mPayments;
  }

  getMaxPayMonth(t1,t2,t3,startDte){
    var years =  Math.max(t1,t2,t3);
    return moment(startDte).add(years,'years').format("MM/DD/yyyy");
  }
  
  formatCurrency(value) {
    var uy = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
    return uy;
  }

  formatPercent(value) {
    var uy = new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits: 2,
    }).format(value);
    return uy;
  }

  unformatNumber(value) {
    //console.log(value.replace(/\$|,/g, ''));
    return value.replace(/\$|,|\%/g, '');
  }
}
