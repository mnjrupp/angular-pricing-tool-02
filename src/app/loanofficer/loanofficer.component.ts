import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {LoanDataService} from '../shared/loan-data.service';
import { CostOfFundsRequest } from '../costoffunds-request-model';
import {CostOfFundsResponse} from '../costoffunds-response-model';

import {LoanOfficer} from '../loanofficer-model';
import  dbOfficers from '../../assets/Officers.json';
import {PricingModel} from '../pricing-model';
import { LocationUpgradeModule } from '@angular/common/upgrade';


@Component({
  selector: 'app-loanofficer',
  templateUrl: './loanofficer.component.html',
  styleUrls: ['./loanofficer.component.css']
})
export class LoanOfficerComponent implements OnInit {
  LoanMoney;
  officers:any;
  formValue : FormGroup;
  costoffundsreqObj: CostOfFundsRequest[];
  costoffundsresObj:CostOfFundsResponse[];
  pricing:PricingModel;
  recommendedRate:number = 0.0;

  constructor(private formbuilder:FormBuilder,
    private apiservice:ApiService,
    private loanservice:LoanDataService) { 
    this.officers = dbOfficers;
    this.costoffundsreqObj =[{
      correlationId:'' ,
      loanNumber: "",
      loanAmount: 145000,
      amortizationType: "P+I",
      amortizationTypeId: 0,
      amortizationTermMonths: 28,
      loanTermMonths: 28,
      paymentsPerYear: 12,
      interestOnlyPayments: 0,
      rateProduct: "Fixed",
      optionCategory: "FYM",
      optionCategoryId: 0,
      lockCategory: "30DL",
      lockCategoryId: 0,
      RoundingRule: {
        Type: "Actual",
        Precision: 0,
        BasisPoint: 0
      }
    },
    {
      correlationId:'' ,
      loanNumber: "",
      loanAmount: 145000,
      amortizationType: "P+I",
      amortizationTypeId: 0,
      amortizationTermMonths: 28,
      loanTermMonths: 28,
      paymentsPerYear: 12,
      interestOnlyPayments: 0,
      rateProduct: "Fixed",
      optionCategory: "FYM",
      optionCategoryId: 0,
      lockCategory: "30DL",
      lockCategoryId: 0,
      RoundingRule: {
        Type: "Actual",
        Precision: 0,
        BasisPoint: 0
      }
    },
    {
      correlationId:'' ,
      loanNumber: "",
      loanAmount: 145000,
      amortizationType: "P+I",
      amortizationTypeId: 0,
      amortizationTermMonths: 28,
      loanTermMonths: 28,
      paymentsPerYear: 12,
      interestOnlyPayments: 0,
      rateProduct: "Fixed",
      optionCategory: "FYM",
      optionCategoryId: 0,
      lockCategory: "30DL",
      lockCategoryId: 0,
      RoundingRule: {
        Type: "Actual",
        Precision: 0,
        BasisPoint: 0
      }
    }]
    this.costoffundsresObj = [{
      "Success": true,
      "Data": [
        {
          "Success": true,
          "Error": null,
          "CorrelationId": "",
          "LoanNumber": "",
          "LoanAmount": 145000,
          "AmortizationType": "P&I",
          "AmortizationTypeId": 1,
          "AmortizationTermMonths": 28,
          "LoanTermMonths": 28,
          "PaymentsPerYear": 12,
          "InterestOnlyPayments": 0,
          "RateProduct": "Fixed",
          "OptionCategory": "FYM",
          "OptionCategoryId": 12,
          "LockCategory": "30DL",
          "LockCategoryId": 3,
          "CurrentIndex": 0,
          "SpreadIndex": 0,
          "MonthlyIndex": 0,
          "Index": 0,
          "Spread": 0.02786894650113,
          "WholesaleRate": 0.02786894650113,
          "RateCode": "FIXTM",
          "RateSetId": 737,
          "RateSourceDate": "2022-03-30T00:00:00-05:00",
          "RateSourceDateDisplay": "Wednesday, March 30, 2022",
          "MonthlyRateSourceDate": "0001-01-01T00:00:00",
          "MonthlyRateSourceDateDisplay": "Monday, January 1, 0001",
          "RateValidThroughDate": "2022-03-31T16:15:00-05:00",
          "RateValidThroughDateDisplay": "Thursday, March 31, 2022 4:15 PM",
          "WeightedAverageLife": 14,
          "LFF": 0.9657,
          "LockExpirationDate": "2022-05-02T17:00:00-05:00",
          "LockExpirationDateDisplay": "Monday, May 2, 2022 5:00 PM",
          "RateLockQuoteId": 0,
          "RateLockQuote": null,
          "TimeStamp": "2022-03-31T09:02:06.7460034-05:00"
        },
        {
          "Success": true,
          "Error": null,
          "CorrelationId": "",
          "LoanNumber": "",
          "LoanAmount": 145000,
          "AmortizationType": "P+I",
          "AmortizationTypeId": 2,
          "AmortizationTermMonths": 28,
          "LoanTermMonths": 28,
          "PaymentsPerYear": 12,
          "InterestOnlyPayments": 0,
          "RateProduct": "Fixed",
          "OptionCategory": "OPO",
          "OptionCategoryId": 6,
          "LockCategory": "30DL",
          "LockCategoryId": 3,
          "CurrentIndex": 0,
          "SpreadIndex": 0,
          "MonthlyIndex": 0,
          "Index": 0,
          "Spread": 0.02939791034013,
          "WholesaleRate": 0.02939791034013,
          "RateCode": "FIXTM",
          "RateSetId": 737,
          "RateSourceDate": "2022-03-30T00:00:00-05:00",
          "RateSourceDateDisplay": "Wednesday, March 30, 2022",
          "MonthlyRateSourceDate": "0001-01-01T00:00:00",
          "MonthlyRateSourceDateDisplay": "Monday, January 1, 0001",
          "RateValidThroughDate": "2022-03-31T16:15:00-05:00",
          "RateValidThroughDateDisplay": "Thursday, March 31, 2022 4:15 PM",
          "WeightedAverageLife": 14,
          "LFF": 0.9657,
          "LockExpirationDate": "2022-05-02T17:00:00-05:00",
          "LockExpirationDateDisplay": "Monday, May 2, 2022 5:00 PM",
          "RateLockQuoteId": 0,
          "RateLockQuote": null,
          "TimeStamp": "2022-03-31T09:02:06.7460034-05:00"
        },
        {
          "Success": true,
          "Error": null,
          "CorrelationId": "",
          "LoanNumber": "",
          "LoanAmount": 145000,
          "AmortizationType": "P+I",
          "AmortizationTypeId": 2,
          "AmortizationTermMonths": 28,
          "LoanTermMonths": 28,
          "PaymentsPerYear": 12,
          "InterestOnlyPayments": 0,
          "RateProduct": "Fixed",
          "OptionCategory": "FYM",
          "OptionCategoryId": 12,
          "LockCategory": "30DL",
          "LockCategoryId": 3,
          "CurrentIndex": 0,
          "SpreadIndex": 0,
          "MonthlyIndex": 0,
          "Index": 0,
          "Spread": 0.02786894650113,
          "WholesaleRate": 0.02786894650113,
          "RateCode": "FIXTM",
          "RateSetId": 737,
          "RateSourceDate": "2022-03-30T00:00:00-05:00",
          "RateSourceDateDisplay": "Wednesday, March 30, 2022",
          "MonthlyRateSourceDate": "0001-01-01T00:00:00",
          "MonthlyRateSourceDateDisplay": "Monday, January 1, 0001",
          "RateValidThroughDate": "2022-03-31T16:15:00-05:00",
          "RateValidThroughDateDisplay": "Thursday, March 31, 2022 4:15 PM",
          "WeightedAverageLife": 14,
          "LFF": 0.9657,
          "LockExpirationDate": "2022-05-02T17:00:00-05:00",
          "LockExpirationDateDisplay": "Monday, May 2, 2022 5:00 PM",
          "RateLockQuoteId": 0,
          "RateLockQuote": null,
          "TimeStamp": "2022-03-31T09:02:06.7460034-05:00"
        }
      ],
      "Error": null
    }]

  }

  getCOF() {
    // TODO: implemet the CostOfFunds from FCBT
    var copyformValue:PricingModel;
    copyformValue =this.formValue.value;
    console.log(copyformValue);
    console.log(this.unformatNumber(copyformValue.IntRate1));
    //console.log(this.costoffundsreqObj[2].amortizationTermMonths);
    console.log(this.buildCOF(copyformValue))
    this.apiservice.postCostofFunds(this.buildCOF(copyformValue)).subscribe(
      (data)=>{
        console.log('data returned ',data)
      },
      (error)=>{
          console.log('error returned =>',error);
          console.log('passing dummy data =>',JSON.stringify(this.costoffundsresObj));
          this.buildPricingModel(this.costoffundsresObj);
      }
    )
  }
  ngOnInit() {
    // subscribe to Loan Data service
    this.loanservice.cast.subscribe(data=>this.pricing = data);
    // variables to hold default data
   this.LoanMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(150000);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var strtoday = mm + '/' + dd + '/' + yyyy;

    this.formValue = this.formbuilder.group({
      applicationName: this.pricing.applicationName,
      phoneNumber: this.pricing.phoneNumber,
      address: this.pricing.address,
      loanDate:this.pricing.loanDate,
      loanOfficer: this.pricing.loanOfficer,
      branchOffice: this.pricing.branchOffice,
      branchaddress: this.pricing.branchaddress,
      calcDate:  this.pricing.calcDate,
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
      AmorType2:this.pricing.AmorType2,
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
      COF1:this.pricing.COF1,
      COF2:this.pricing.COF2,
      COF3:this.pricing.COF3

    })

  }
  buildCOF(value:PricingModel){
    this.costoffundsreqObj[0].amortizationTermMonths=value.AmorTerm1
    this.costoffundsreqObj[0].amortizationType=value.AmorType1
    this.costoffundsreqObj[0].amortizationTypeId=0
    this.costoffundsreqObj[0].correlationId=''
    this.costoffundsreqObj[0].interestOnlyPayments=0
    this.costoffundsreqObj[0].loanAmount=+this.unformatNumber(value.loanAmnt)
    this.costoffundsreqObj[0].loanNumber=''
    this.costoffundsreqObj[0].loanTermMonths=+value.loanProd1
    this.costoffundsreqObj[0].lockCategory='30DL'
    this.costoffundsreqObj[0].lockCategoryId=0
    this.costoffundsreqObj[0].optionCategory=value.TransferOption1
    this.costoffundsreqObj[0].optionCategoryId=0
    this.costoffundsreqObj[0].paymentsPerYear=value.paymentfreq
    this.costoffundsreqObj[0].rateProduct='Fixed'
    this.costoffundsreqObj[1].amortizationTermMonths=value.AmorTerm2
    this.costoffundsreqObj[1].amortizationType=value.AmorType2
    this.costoffundsreqObj[1].amortizationTypeId=0
    this.costoffundsreqObj[1].correlationId=''
    this.costoffundsreqObj[1].interestOnlyPayments=0
    this.costoffundsreqObj[1].loanAmount=+this.unformatNumber(value.loanAmnt)
    this.costoffundsreqObj[1].loanNumber=''
    this.costoffundsreqObj[1].loanTermMonths=+value.loanProd2
    this.costoffundsreqObj[1].lockCategory='30DL'
    this.costoffundsreqObj[1].lockCategoryId=0
    this.costoffundsreqObj[1].optionCategory=value.TransferOption2
    this.costoffundsreqObj[1].optionCategoryId=0
    this.costoffundsreqObj[1].paymentsPerYear=value.paymentfreq
    this.costoffundsreqObj[1].rateProduct='Fixed'
    this.costoffundsreqObj[2].amortizationTermMonths=value.AmorTerm3
    this.costoffundsreqObj[2].amortizationType=value.AmorType3
    this.costoffundsreqObj[2].amortizationTypeId=0
    this.costoffundsreqObj[2].correlationId=''
    this.costoffundsreqObj[2].interestOnlyPayments=0
    this.costoffundsreqObj[2].loanAmount=+this.unformatNumber(value.loanAmnt)
    this.costoffundsreqObj[2].loanNumber=''
    this.costoffundsreqObj[2].loanTermMonths=+value.loanProd3
    this.costoffundsreqObj[2].lockCategory='30DL'
    this.costoffundsreqObj[2].lockCategoryId=0
    this.costoffundsreqObj[2].optionCategory=value.TransferOption3
    this.costoffundsreqObj[2].optionCategoryId=0
    this.costoffundsreqObj[2].paymentsPerYear=value.paymentfreq
    this.costoffundsreqObj[2].rateProduct='Fixed'
   return this.costoffundsreqObj;

  }

  buildPricingModel(value:CostOfFundsResponse[]){
    this.formValue.patchValue({COF1:this.formatPercent(value[0].Data[0].Spread),
      COF2:this.formatPercent(value[0].Data[1].Spread),
      COF3:this.formatPercent(value[0].Data[2].Spread),

    });
  }
  buildRecomRate(spread:number,loanAmnt:number,loanProd:number,pd:number,lgd:number,payfreq:number){
   spread+0;
   var loanfloat=0;
   var loanProduct = this.loanservice.loanProductArray.filter(x=>x.Product===loanProd);
   var paymentfrequency=0;
   var pdlgdStr = this.buildPDLGDStr(pd,lgd);
   var pdlgdfloat = this.loanservice.loanpdlgdArray.filter(x=>x.pd===pdlgdStr)
   if(loanAmnt>=2000000){
     loanfloat=-0.002;
   }else if(loanAmnt>=1000000){
     loanfloat=-0.003;
   }else if(loanAmnt>=500000){
     loanfloat=-0.0015;
   }

   if(payfreq<=2){
     paymentfrequency=0.001;
   }
   return spread+loanfloat+loanProduct[0].value+pdlgdfloat[0].value+paymentfrequency;
  }

  buildPDLGDStr(pd:number,lgd:number){
    var lgdStr;
    if(pd===null){pd=5}
    switch(lgd){
      case 1:
        lgdStr='B'
        break;
      case 2:
        lgdStr='D'
        break;
      case 3:
        lgdStr='E'
        break;
      case 4:
        lgdStr='F'
      break;
      default:
       lgdStr='B'
    }
    return pd.toString().concat(lgdStr);
  }
  updateOfficerData(value){
    //console.log(event.value);
    var foundOfficer:LoanOfficer = this.officers.filter(x=> x.name===value);
    const attr = "location";
      console.log(foundOfficer[0].location);
      this.formValue.patchValue({branchOffice:foundOfficer[0].location,
        branchaddress:foundOfficer[0].Address});
        this.pricing.loanOfficer=foundOfficer[0].name;
        this.pricing.branchOffice=foundOfficer[0].location;
        this.pricing.branchaddress=foundOfficer[0].Address;
        this.pricing.branchPhone=foundOfficer[0].phone;
        this.loanservice.editModel(this.pricing);
    }
    updateApplicantDataName(event){
      console.log(event.target.value);
      this.pricing.applicationName=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataPhone(event){
      console.log(event.target.value);
      this.pricing.phoneNumber=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataAddress(event){
      console.log(event.target.value);
      this.pricing.address=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataAmortTypeOne(event){
      console.log(event.target.value);
      this.pricing.AmorType1=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataAmortTypeTwo(event){
      console.log(event.target.value);
      this.pricing.AmorType2=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataAmortTypeThree(event){
      console.log(event.target.value);
      this.pricing.AmorType3=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataAmortTermOne(event){
      console.log(event.target.value);
      this.pricing.AmorTerm1=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataAmortTermTwo(event){
      console.log(event.target.value);
      this.pricing.AmorTerm2=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataAmortTermThree(event){
      console.log(event.target.value);
      this.pricing.AmorTerm3=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataLoanProdOne(event){
      console.log(event.target.value);
      this.pricing.loanProd1=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataLoanProdTwo(event){
      console.log(event.target.value);
      this.pricing.loanProd2=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataLoanProdThree(event){
      console.log(event.target.value);
      this.pricing.loanProd3=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataTransOptOne(event){
      console.log(event.target.value);
      this.pricing.TransferOption1=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataTransOptTwo(event){
      console.log(event.target.value);
      this.pricing.TransferOption2=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    updateApplicantDataTransOptThree(event){
      console.log(event.target.value);
      this.pricing.TransferOption3=event.target.value;
      this.loanservice.editModel(this.pricing);

    }
    formatCurrency_LoanAmnt(event)
    {
      var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(event.target.value);
      this.formValue.patchValue({loanAmnt:uy});
      this.pricing.loanAmnt=uy;
      this.loanservice.editModel(this.pricing);
     
    }
    formatCurrency_FeeAmnt(event)
    {
      var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(event.target.value);
      this.formValue.patchValue({feeAmnt:uy});
      this.pricing.feeAmnt=uy;
      this.loanservice.editModel(this.pricing);
     
    }
    formatCurrency(value){
      var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(value);
      return uy;
    }

    formatPercent(value){
      var uy = new Intl.NumberFormat('en-US',{style: 'percent', maximumFractionDigits: 2}).format(value);
      return uy;
    }
    formatPercent_var1(event){
      this.formValue.patchValue({Variance1:this.formatPercent(event.target.value)});
    }
    unformatNumber(value){
      //console.log(value.replace(/\$|,/g, ''));
      return value.replace(/\$|,|\%/g, '');
    }
  }
