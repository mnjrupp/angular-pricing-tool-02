import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaymentModel} from '../payment-model';
import { PricingModel } from '../pricing-model';
import moment from 'moment';

@Injectable()
export class PaymentDataService {
 paymentmodel:PaymentModel[] = [{
  paymentnum: '',
  payDate: '',
  balance: '',
  payment: '',
  principal: '',
  interest: '',
  endbalance: '',
  cumulativeint: '',
  TotalInt:0,
  AmorType:''
},];

 private payments = new BehaviorSubject<PaymentModel[]>(this.paymentmodel);

 cast = this.payments.asObservable();
  constructor() { }

  editModel(newModel){
    this.payments.next(newModel);
  }

  buildpayments(data: PricingModel,scenario:number) {
    var TotalPayments = data.loanProd1 * data.paymentfreq;
    var Amorttype = function(){ 
              if(scenario==1){ return data.AmorType1}
              else if(scenario==2){ return data.AmorType2}
              else if(scenario==3){return data.AmorType3}
            };
    var Balance = Number(this.unformatNumber(data.loanAmnt));

    var schedPay = function(){ var d;
                                  switch(scenario){
                                      case 1:d=data.PayAmnt1;break;
                                      case 2:d=data.PayAmnt2;break;
                                      case 3:d=data.PayAmnt3;break;
                                  }
                                return this.unformatNumber(d);

                              }

    var displayPay = this.formatCurrency(schedPay);

    var RecomRate = function(){ var d;
                                switch(scenario){
                                    case 1:d=data.RecomRate1;break;
                                    case 2:d=data.RecomRate2;break;
                                    case 3:d=data.RecomRate3;break;
                                }
                              return Number(this.unformatNumber(d))/100;

                            }
    
    //Number(this.unformatNumber(data.RecomRate1))/100;
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
        AmorType:''
      },
    ];
    if (TotalPayments > 0 && Balance>0 && Number(schedPay)>0) {
      for (var i = 0; i < TotalPayments; i++) {
        Interest = this.formatCurrency(
          Balance * (Number(RecomRate) / data.paymentfreq)
        );
        Principal = this.formatCurrency(
          Number(schedPay) - Balance * (Number(RecomRate) / data.paymentfreq)
        );
        EndBalance = this.formatCurrency(
          Balance - (Number(schedPay) - Balance * (Number(RecomRate) / data.paymentfreq))
        );
        CumInterest +=Number(this.unformatNumber(Interest));
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
          TotalInt:CumInterest,
          AmorType:Amorttype.toString()
        });
     
        Balance =
          Number(this.unformatNumber(EndBalance));
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

  formatCurrency(value){
    var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(value);
    return uy;
  }

  formatPercent(value){
    var uy = new Intl.NumberFormat('en-US',{style: 'percent', maximumFractionDigits: 2}).format(value);
    return uy;
  }

  unformatNumber(value) {
    //console.log(value.replace(/\$|,/g, ''));
    return value.replace(/\$|,|\%/g, '');
  }
}