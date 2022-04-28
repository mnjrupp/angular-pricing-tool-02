import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PricingModel} from '../pricing-model';

@Injectable()
export class LoanDataService {
  LoanMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(150000);
  feeMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0);
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();

    strtoday = this.mm + '/' + this.dd + '/' + this.yyyy;
  pricingmodel:PricingModel ={
    applicationName: 'Joe Brown',
    phoneNumber: '',
    address: '',
    loanDate:'',
    loanOfficer: '',
    branchOffice: '',
    branchaddress: '',
    branchPhone:'',
    calcDate:  this.strtoday,
    fsaguarantee: 1,
    loantype: 2,
    lienpos: 1,
    loanAmnt: this.LoanMoney,
    paymentfreq: 12,
    pd: 4,
    ballonyrs: 1,
    locateral: 1,
    feeAmnt: this.feeMoney,
    stockAmnt:this.formatCurrency(0),
    lgd: 1,
    ballon: null,
    AmorType1: 'P&I',
    AmorTerm1: 20,
    loanProd1: 20,
    TransferOption1: 'OPO',
    IntRate1: this.formatPercent(0.0256),
    PayAmnt1: this.formatCurrency(1000),
    AmorType2:'P&I',
    AmorTerm2: 20,
    loanProd2: 20,
    TransferOption2: 'OPO',
    IntRate2: this.formatPercent(0.0256),
    PayAmnt2: this.formatCurrency(1000),
    AmorType3: 'P+I',
    AmorTerm3: 20,
    loanProd3: 20,
    TransferOption3: 'OPO',
    IntRate3: this.formatPercent(0.0256),
    PayAmnt3: this.formatCurrency(863.74),
    RecomRate1: this.formatPercent(0.0464),
    RecomSpread1: this.formatPercent(0.0265),
    Variance1: 0,
    finalSpread1: this.formatPercent(0.0265),
    RecomRate2: this.formatPercent(0.0464),
    RecomSpread2: this.formatPercent(0.0265),
    Variance2: 0,
    finalSpread2: this.formatPercent(0.0265),
    RecomRate3: this.formatPercent(0.0464),
    RecomSpread3: this.formatPercent(0.0265),
    Variance3: 0,
    finalSpread3: this.formatPercent(0.0265),
    COF1:'NA',
    COF2:'NA',
    COF3:'NA',
    PostPatRate1:'',
    PostPatRate2:'',
    PostPatRate3:'',
    PostPatSave1:'',
    PostPatSave2:'',
    PostPatSave3:''

  }
  private cofRes = new BehaviorSubject<PricingModel>(this.pricingmodel);
  cast = this.cofRes.asObservable();
  constructor() {
  
   }

   editModel(newModel){
     this.cofRes.next(newModel);
   }
   formatCurrency(value){
    var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(value);
    return uy;
  }

  formatPercent(value){
    var uy = new Intl.NumberFormat('en-US',{style: 'percent', maximumFractionDigits: 2}).format(value);
    return uy;
  }

}