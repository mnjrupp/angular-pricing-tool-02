import { visitValue } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PricingModel} from '../pricing-model';
import moment from 'moment';

@Injectable()
export class LoanDataService {
  LoanMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0);
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
    loanDate:this.getLoanStartDate(this.strtoday).toString(),
    loanOfficer: '',
    branchOffice: '',
    branchaddress: '',
    branchPhone:'',
    calcDate:  this.strtoday,
    fsaguarantee: 1,
    loantype: 2,
    lienpos: 1,
    loanAmnt: '',
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
    PayAmnt1: this.formatCurrency(0),
    TotalInt1:0,
    AmorType2:'P&I',
    AmorTerm2: 20,
    loanProd2: 20,
    TransferOption2: 'OPO',
    IntRate2: this.formatPercent(0.0256),
    PayAmnt2: this.formatCurrency(0),
    TotalInt2:0,
    AmorType3: 'P+I',
    AmorTerm3: 20,
    loanProd3: 20,
    TransferOption3: 'OPO',
    IntRate3: this.formatPercent(0.0256),
    PayAmnt3: this.formatCurrency(0),
    TotalInt3:0,
    RecomRate1: this.formatPercent(0.0464),
    RecomSpread1: this.formatPercent(0.0265),
    Variance1: '',
    finalSpread1: this.formatPercent(0.0265),
    RecomRate2: this.formatPercent(0.0464),
    RecomSpread2: this.formatPercent(0.0265),
    Variance2: '',
    finalSpread2: this.formatPercent(0.0265),
    RecomRate3: this.formatPercent(0.0464),
    RecomSpread3: this.formatPercent(0.0265),
    Variance3: '',
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
  loanProductArray = [
    {Product:15,value:0.001},
    {Product:10,value:0.0005},
    {Product:20,value:0.0015},
    {Product:25,value:0.002},
    {Product:30,value:0.002}]

   loanpdlgdArray = [
     {pd:'4D',value:0.0240},
     {pd:'4B',value:0.0235},
     {pd:'4E',value:0.0245},
     {pd:'4F',value:0.0255},
     {pd:'5D',value:0.0250},
     {pd:'5B',value:0.0245},
     {pd:'5E',value:0.0255},
     {pd:'5F',value:0.0265},
     {pd:'6D',value:0.0260},
     {pd:'6B',value:0.0255},
     {pd:'6E',value:0.0265},
     {pd:'6F',value:0.0275},
     {pd:'7D',value:0.0265},
     {pd:'7B',value:0.0260},
     {pd:'7E',value:0.0270},
     {pd:'7F',value:0.0280},
     {pd:'8D',value:0.0285},
     {pd:'8B',value:0.0275},
     {pd:'8E',value:0.0295},
     {pd:'8F',value:0.0305},
     {pd:'9D',value:0.0305},
     {pd:'9B',value:0.0290},
     {pd:'9E',value:0.0320},
     {pd:'9F',value:0.0335},

    ]

    loanPremiumArray = [
      {prodamort:2,value:0.0},
      {prodamort:4,value:0.0},
      {prodamort:6,value:0.0},
      {prodamort:8,value:0.0},
      {prodamort:10,value:0.0},
      {prodamort:14,value:0.0},
      {prodamort:20,value:0.0005},
      {prodamort:30,value:0.0010},
      {prodamort:40,value:0.0015},
      {prodamort:50,value:0.0020},
      {prodamort:60,value:0.0020}
    ]

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
  getLoanStartDate(value){
    var dString = moment(value);

    //console.log('getLoanStartDate ', value)
    console.log('getLoanStartDate ', moment(dString).add(30,'days') )
    return moment(dString).add(30,'days').format("MM/DD/yyyy");
  }
  unformatNumber(value) {
    //console.log(value.replace(/\$|,/g, ''));
    return value.replace(/\$|,|\%/g, '');
  }
}