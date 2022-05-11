import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { LoanDataService } from '../shared/loan-data.service';
import { CostOfFundsRequest } from '../costoffunds-request-model';
import { CostOfFundsResponse } from '../costoffunds-response-model';

import { LoanOfficer } from '../loanofficer-model';
import dbOfficers from '../../assets/Officers.json';
import { PricingModel } from '../pricing-model';
import { LocationUpgradeModule } from '@angular/common/upgrade';
import { NumberFormatStyle } from '@angular/common';

import {COFs} from '../COFReqdummy';
import {COFResponse} from '../COFRespdummy';

@Component({
  selector: 'app-loanofficer',
  templateUrl: './loanofficer.component.html',
  styleUrls: ['./loanofficer.component.css'],
})
export class LoanOfficerComponent implements OnInit {
  LoanMoney;
  officers: any;
  formValue: FormGroup;
  costoffundsreqObj: CostOfFundsRequest[];
  costoffundsresObj: CostOfFundsResponse[];
  pricing: PricingModel;
  recommendedRate: number = 0.0;

  constructor(
    private formbuilder: FormBuilder,
    private apiservice: ApiService,
    private loanservice: LoanDataService
  ) {
    this.officers = dbOfficers;
    this.costoffundsreqObj = COFs;
    this.costoffundsresObj = COFResponse; 
  }

  getCOF() {
    // TODO: implemet the CostOfFunds from FCBT
    var copyformValue: PricingModel;
    copyformValue = this.formValue.value;
    console.log(copyformValue);
    console.log(this.unformatNumber(copyformValue.IntRate1));
    //console.log(this.costoffundsreqObj[2].amortizationTermMonths);
    console.log(this.buildCOF(copyformValue));
    this.apiservice.postCostofFunds(this.buildCOF(copyformValue)).subscribe(
      (data) => {
        console.log('data returned ', data);
      },
      (error) => {
        console.log('error returned =>', error);
        /*console.log(
          'passing dummy data =>',
          JSON.stringify(this.costoffundsresObj)
        );*/
        this.buildPricingModel(this.costoffundsresObj);
      }
    );
  }
  ngOnInit() {
    // subscribe to Loan Data service
    this.loanservice.cast.subscribe((data) => (this.pricing = data));
    // variables to hold default data
    this.LoanMoney = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(150000);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var strtoday = mm + '/' + dd + '/' + yyyy;

    this.formValue = this.formbuilder.group({
      applicationName: this.pricing.applicationName,
      phoneNumber: this.pricing.phoneNumber,
      address: this.pricing.address,
      loanDate: this.pricing.loanDate,
      loanOfficer: this.pricing.loanOfficer,
      branchOffice: this.pricing.branchOffice,
      branchaddress: this.pricing.branchaddress,
      calcDate: this.pricing.calcDate,
      fsaguarantee: this.pricing.fsaguarantee,
      loantype: this.pricing.loantype,
      lienpos: this.pricing.lienpos,
      loanAmnt: this.pricing.loanAmnt,
      paymentfreq: this.pricing.paymentfreq,
      pd: this.pricing.pd,
      ballonyrs: this.pricing.ballonyrs,
      locateral: this.pricing.locateral,
      feeAmnt: this.pricing.feeAmnt,
      lgd: this.pricing.lgd,
      ballon: this.pricing.ballon,
      AmorType1: this.pricing.AmorType1,
      AmorTerm1: this.pricing.AmorTerm1,
      loanProd1: this.pricing.loanProd1,
      TransferOption1: this.pricing.TransferOption1,
      IntRate1: this.pricing.IntRate1,
      PayAmnt1: this.pricing.PayAmnt1,
      AmorType2: this.pricing.AmorType2,
      AmorTerm2: this.pricing.AmorTerm2,
      loanProd2: this.pricing.loanProd2,
      TransferOption2: this.pricing.TransferOption2,
      IntRate2: this.pricing.IntRate2,
      PayAmnt2: this.pricing.PayAmnt2,
      AmorType3: this.pricing.AmorType3,
      AmorTerm3: this.pricing.AmorTerm3,
      loanProd3: this.pricing.loanProd3,
      TransferOption3: this.pricing.TransferOption3,
      IntRate3: this.pricing.IntRate3,
      PayAmnt3: this.pricing.PayAmnt3,
      RecomRate1: this.pricing.RecomRate1,
      RecomSpread1: this.pricing.RecomSpread1,
      Variance1: this.pricing.Variance1,
      finalSpread1: this.pricing.finalSpread2,
      RecomRate2: this.pricing.RecomRate2,
      RecomSpread2: this.pricing.RecomSpread2,
      Variance2: this.pricing.Variance2,
      finalSpread2: this.pricing.finalSpread2,
      RecomRate3: this.pricing.RecomRate3,
      RecomSpread3: this.pricing.RecomSpread3,
      Variance3: this.pricing.Variance3,
      finalSpread3: this.pricing.finalSpread3,
      COF1: this.pricing.COF1,
      COF2: this.pricing.COF2,
      COF3: this.pricing.COF3,
    });
  }
  buildCOF(value: PricingModel) {
    this.costoffundsreqObj[0].amortizationTermMonths = value.AmorTerm1;
    this.costoffundsreqObj[0].amortizationType = value.AmorType1;
    this.costoffundsreqObj[0].amortizationTypeId = 0;
    this.costoffundsreqObj[0].correlationId = '';
    this.costoffundsreqObj[0].interestOnlyPayments = 0;
    this.costoffundsreqObj[0].loanAmount = +this.unformatNumber(value.loanAmnt);
    this.costoffundsreqObj[0].loanNumber = '';
    this.costoffundsreqObj[0].loanTermMonths = +value.loanProd1;
    this.costoffundsreqObj[0].lockCategory = '30DL';
    this.costoffundsreqObj[0].lockCategoryId = 0;
    this.costoffundsreqObj[0].optionCategory = value.TransferOption1;
    this.costoffundsreqObj[0].optionCategoryId = 0;
    this.costoffundsreqObj[0].paymentsPerYear = value.paymentfreq;
    this.costoffundsreqObj[0].rateProduct = 'Fixed';
    this.costoffundsreqObj[1].amortizationTermMonths = value.AmorTerm2;
    this.costoffundsreqObj[1].amortizationType = value.AmorType2;
    this.costoffundsreqObj[1].amortizationTypeId = 0;
    this.costoffundsreqObj[1].correlationId = '';
    this.costoffundsreqObj[1].interestOnlyPayments = 0;
    this.costoffundsreqObj[1].loanAmount = +this.unformatNumber(value.loanAmnt);
    this.costoffundsreqObj[1].loanNumber = '';
    this.costoffundsreqObj[1].loanTermMonths = +value.loanProd2;
    this.costoffundsreqObj[1].lockCategory = '30DL';
    this.costoffundsreqObj[1].lockCategoryId = 0;
    this.costoffundsreqObj[1].optionCategory = value.TransferOption2;
    this.costoffundsreqObj[1].optionCategoryId = 0;
    this.costoffundsreqObj[1].paymentsPerYear = value.paymentfreq;
    this.costoffundsreqObj[1].rateProduct = 'Fixed';
    this.costoffundsreqObj[2].amortizationTermMonths = value.AmorTerm3;
    this.costoffundsreqObj[2].amortizationType = value.AmorType3;
    this.costoffundsreqObj[2].amortizationTypeId = 0;
    this.costoffundsreqObj[2].correlationId = '';
    this.costoffundsreqObj[2].interestOnlyPayments = 0;
    this.costoffundsreqObj[2].loanAmount = +this.unformatNumber(value.loanAmnt);
    this.costoffundsreqObj[2].loanNumber = '';
    this.costoffundsreqObj[2].loanTermMonths = +value.loanProd3;
    this.costoffundsreqObj[2].lockCategory = '30DL';
    this.costoffundsreqObj[2].lockCategoryId = 0;
    this.costoffundsreqObj[2].optionCategory = value.TransferOption3;
    this.costoffundsreqObj[2].optionCategoryId = 0;
    this.costoffundsreqObj[2].paymentsPerYear = value.paymentfreq;
    this.costoffundsreqObj[2].rateProduct = 'Fixed';
    return this.costoffundsreqObj;
  }

  buildPricingModel(value: CostOfFundsResponse[]) {
    var recomrate1 = this.buildRecomRate(
      value[0].Data[0].Spread,
      this.unformatNumber(this.pricing.loanAmnt),
      this.pricing.loanProd1,
      this.pricing.pd,
      this.pricing.lgd,
      this.pricing.paymentfreq,
      this.pricing.AmorTerm1
    );
    var recomrate2 = this.buildRecomRate(
      value[0].Data[1].Spread,
      this.unformatNumber(this.pricing.loanAmnt),
      this.pricing.loanProd1,
      this.pricing.pd,
      this.pricing.lgd,
      this.pricing.paymentfreq,
      this.pricing.AmorTerm2
    );
    var recomrate3 = this.buildRecomRate(
      value[0].Data[2].Spread,
      this.unformatNumber(this.pricing.loanAmnt),
      this.pricing.loanProd1,
      this.pricing.pd,
      this.pricing.lgd,
      this.pricing.paymentfreq,
      this.pricing.AmorTerm3
    );
    var recomspread1 = (recomrate1 - value[0].Data[0].Spread);
    var recomspread2 = (recomrate2 - value[0].Data[1].Spread);
    var recomspread3 = (recomrate3 - value[0].Data[2].Spread);
    
    var estIntRate1 = (recomrate1+(parseFloat(this.pricing.Variance1) || 0))
    var estIntRate2 = (recomrate2+(parseFloat(this.pricing.Variance2) || 0))
    var estIntRate3 = (recomrate3+(parseFloat(this.pricing.Variance3) || 0))
    var payment1 = this.formatCurrency(-1*this.build1stPaymnt(estIntRate1,(this.pricing.AmorTerm1*this.pricing.paymentfreq),this.unformatNumber(this.pricing.loanAmnt)))
    var payment2 = this.formatCurrency(-1*this.build1stPaymnt(estIntRate2,(this.pricing.AmorTerm2*this.pricing.paymentfreq),this.unformatNumber(this.pricing.loanAmnt)))
    var payment3 = this.formatCurrency(-1*this.build1stPaymnt(estIntRate3,(this.pricing.AmorTerm3*this.pricing.paymentfreq),this.unformatNumber(this.pricing.loanAmnt)))
     
    //console.log('Loan Officer Variance 1 ',this.pricing.Variance1)
    //console.log('Recommended Spread 1 ',recomspread1);
    this.formValue.patchValue({
      COF1: this.formatPercent(value[0].Data[0].Spread),
      COF2: this.formatPercent(value[0].Data[1].Spread),
      COF3: this.formatPercent(value[0].Data[2].Spread),
      RecomRate1: this.formatPercent(recomrate1),
      RecomRate2: this.formatPercent(recomrate2),
      RecomRate3: this.formatPercent(recomrate3),
      RecomSpread1: this.formatPercent(recomspread1),
      RecomSpread2: this.formatPercent(recomspread2),
      RecomSpread3: this.formatPercent(recomspread3),
      finalSpread1:this.formatPercent(recomspread1+(parseFloat(this.pricing.Variance1) || 0)),
      finalSpread2:this.formatPercent(recomspread2+(parseFloat(this.pricing.Variance2) || 0)),
      finalSpread3:this.formatPercent(recomspread3+(parseFloat(this.pricing.Variance3) || 0)),
      IntRate1:this.formatPercent(estIntRate1),
      IntRate2:this.formatPercent(estIntRate2),
      IntRate3:this.formatPercent(estIntRate3),
      PayAmnt1:payment1,
      PayAmnt2:payment2,
      PayAmnt3:payment3
    });

    this.pricing.PayAmnt1 = payment1;
    this.pricing.PayAmnt2 = payment2;
    this.pricing.PayAmnt3 = payment3;
    this.pricing.RecomSpread1 = this.formatPercent(recomspread1);
    this.pricing.RecomSpread2 = this.formatPercent(recomspread2);
    this.pricing.RecomSpread3 = this.formatPercent(recomspread3);
    this.pricing.IntRate1 = this.formatPercent(estIntRate1);
    this.pricing.IntRate2 = this.formatPercent(estIntRate2);
    this.pricing.IntRate3 = this.formatPercent(estIntRate3);

    this.pricing.PostPatRate1 = this.formatPercent(
      this.buildPatrRate(
        this.pricing.branchOffice, estIntRate1,
      (recomspread1+(parseFloat(this.pricing.Variance1) || 0)) ));

    this.pricing.PostPatRate2 = this.formatPercent(
        this.buildPatrRate(
          this.pricing.branchOffice, estIntRate2,
        (recomspread2+(parseFloat(this.pricing.Variance2) || 0)) ));

    this.pricing.PostPatRate3 = this.formatPercent(
          this.buildPatrRate(
            this.pricing.branchOffice, estIntRate3,
          (recomspread3+(parseFloat(this.pricing.Variance3) || 0)) ))

    this.pricing.PostPatSave1 = this.formatCurrency(
      this.buildPatrSavings(this.pricing.branchOffice,
        this.unformatNumber(this.pricing.loanAmnt),
        (recomspread1+(parseFloat(this.pricing.Variance1) || 0)) ));

    this.loanservice.editModel(this.pricing);

    this.pricing.PostPatSave2 = this.formatCurrency(
      this.buildPatrSavings(this.pricing.branchOffice,
        this.unformatNumber(this.pricing.loanAmnt),
        (recomspread2+(parseFloat(this.pricing.Variance2) || 0)) ));

    this.pricing.PostPatSave3 = this.formatCurrency(
          this.buildPatrSavings(this.pricing.branchOffice,
            this.unformatNumber(this.pricing.loanAmnt),
            (recomspread3+(parseFloat(this.pricing.Variance3) || 0)) ));
    
    this.loanservice.editModel(this.pricing);
   
  }
  buildRecomRate(
    spread: number,
    loanAmnt: number,
    loanProd: number,
    pd: number,
    lgd: number,
    payfreq: number,
    amort:number
  ) {
         spread + 0;
    var loanfloat = 0;
    var loanProduct = this.loanservice.loanProductArray.filter(
      (x) => x.Product === loanProd
    );
    var paymentfrequency = 0;
    var premium = this.loanservice.loanPremiumArray.filter(
      (x)=> x.prodamort===(loanProd+amort)
    );
    var pdlgdStr = this.buildPDLGDStr(pd, lgd);
    var pdlgdfloat = this.loanservice.loanpdlgdArray.filter(
      (x) => x.pd === pdlgdStr
    );
    if (loanAmnt >= 2000000) {
      loanfloat = -0.002;
    } else if (loanAmnt >= 1000000) {
      loanfloat = -0.003;
    } else if (loanAmnt >= 500000) {
      loanfloat = -0.0015;
    }

    if (payfreq <= 2) {
      paymentfrequency = 0.001;
    }
    return (
      spread +
      loanfloat +
      loanProduct[0].value +
      pdlgdfloat[0].value +
      premium[0].value +
      paymentfrequency
    );
  }

  buildPDLGDStr(pd: number, lgd: number) {
    var lgdStr;
    if (pd === null) {
      pd = 5;
    }
    switch (lgd) {
      case 1:
        lgdStr = 'B';
        break;
      case 2:
        lgdStr = 'D';
        break;
      case 3:
        lgdStr = 'E';
        break;
      case 4:
        lgdStr = 'F';
        break;
      default:
        lgdStr = 'B';
    }
    return pd.toString().concat(lgdStr);
  }
  updateOfficerData(value) {
    //console.log(event.value);
    var foundOfficer: LoanOfficer = this.officers.filter(
      (x) => x.name === value
    );
    const attr = 'location';
    console.log(foundOfficer[0].location);
    this.formValue.patchValue({
      branchOffice: foundOfficer[0].location,
      branchaddress: foundOfficer[0].Address,
    });
    this.pricing.loanOfficer = foundOfficer[0].name;
    this.pricing.branchOffice = foundOfficer[0].location;
    this.pricing.branchaddress = foundOfficer[0].Address;
    this.pricing.branchPhone = foundOfficer[0].phone;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataName(event) {
    console.log(event.target.value);
    this.pricing.applicationName = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataPhone(event) {
    console.log(event.target.value);
    this.pricing.phoneNumber = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataAddress(event) {
    console.log(event.target.value);
    this.pricing.address = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataAmortTypeOne(event) {
    console.log(event.target.value);
    this.pricing.AmorType1 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataAmortTypeTwo(event) {
    console.log(event.target.value);
    this.pricing.AmorType2 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataAmortTypeThree(event) {
    console.log(event.target.value);
    this.pricing.AmorType3 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataAmortTermOne(event) {
    console.log(event.target.value);
    this.pricing.AmorTerm1 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataAmortTermTwo(event) {
    console.log(event.target.value);
    this.pricing.AmorTerm2 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataAmortTermThree(event) {
    console.log(event.target.value);
    this.pricing.AmorTerm3 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataLoanProdOne(event) {
    console.log(event.target.value);
    this.pricing.loanProd1 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataLoanProdTwo(event) {
    console.log(event.target.value);
    this.pricing.loanProd2 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataLoanProdThree(event) {
    console.log(event.target.value);
    this.pricing.loanProd3 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataTransOptOne(event) {
    console.log(event.target.value);
    this.pricing.TransferOption1 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataTransOptTwo(event) {
    console.log(event.target.value);
    this.pricing.TransferOption2 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updateApplicantDataTransOptThree(event) {
    console.log(event.target.value);
    this.pricing.TransferOption3 = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  updatePayFreq(event){
    console.log(event.target.value);
    this.pricing.paymentfreq = event.target.value;
    this.loanservice.editModel(this.pricing);
  }
  formatCurrency_LoanAmnt(event) {
    var uy = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(event.target.value);
    this.formValue.patchValue({ loanAmnt: uy });
    this.pricing.loanAmnt = uy;
    this.loanservice.editModel(this.pricing);
  }
  formatCurrency_FeeAmnt(event) {
    var uy = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(event.target.value);
    this.formValue.patchValue({ feeAmnt: uy });
    this.pricing.feeAmnt = uy;
    this.loanservice.editModel(this.pricing);
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
  formatPercent_var1(event) {
    this.pricing.Variance1=event.target.value;
    this.formValue.patchValue({
      Variance1: this.formatPercent(event.target.value),
     
    });
    
    this.loanservice.editModel(this.pricing);
  }
  formatPercent_var2(event) {
    this.pricing.Variance2=event.target.value;
    this.formValue.patchValue({
      Variance2: this.formatPercent(event.target.value),
     
    });
    
    this.loanservice.editModel(this.pricing);
  }
  formatPercent_var3(event) {
    this.pricing.Variance3=event.target.value;
    this.formValue.patchValue({
      Variance3: this.formatPercent(event.target.value),
     
    });
    
    this.loanservice.editModel(this.pricing);
  }
  unformatNumber(value) {
    //console.log(value.replace(/\$|,/g, ''));
    return value.replace(/\$|,|\%/g, '');
  }
  buildPatrRate(location:string,ir:number,fs:number){
   /*
     location - Branch 
     ir       - Est Interest Rate
     fs       - Final Spread
      */
     var ppRate = ir;
      if(location =="Agribusiness"){
        ppRate = ir - 0.0085;
      } else if(fs == 0.0247){
         ppRate = ir - 0.01
      }else{
        ppRate = ir - ((fs/0.0247) *0.01)
      }
      return ppRate;
  }

  buildPatrSavings(location:string,loanAmnt:number,fs:number){

    /*
     location - Branch 
     loanAmnt - Loan Amount
     fs       - Final Spread
      */

     var ppSavings = 0;
     if(location =="Agribusiness"){
        ppSavings = loanAmnt * 0.0085;

     } else if(fs==0.0247){
        ppSavings = loanAmnt * 0.01
     }else{
       ppSavings = loanAmnt * ((fs/0.0247) * 0.01)
     }
     return ppSavings;

  }
  buildPMT(ir:number, np:number, pv:number,fv?:number,type?:number){
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv)/np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;

  }

  build1stPaymnt(ir:number,np:number,pv:number){
    /* PMT(Estimated Interest Rate/Payments per year,(Loan Years * Payments per year),Loan Amount)
	      + (Loan Amount * ( Estimated Interest Rate/Payments per year)) */
        console.log('Interest Rate buid1stPaymnt ',ir)
        console.log('payments per year buid1stPaymnt ',this.pricing.paymentfreq)
        console.log('Loan Amount buid1stPaymnt ',pv)
        console.log('# payments buid1stPaymnt ',np)
    return this.buildPMT(ir/this.pricing.paymentfreq,np,pv) + (pv*(ir/np));

  }
}
