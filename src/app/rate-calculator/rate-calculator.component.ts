import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {LoanDataService} from '../shared/loan-data.service';
import {PricingModel} from '../pricing-model';

@Component({
  selector: 'app-rate-calculator',
  templateUrl: './rate-calculator.component.html',
  styleUrls: ['./rate-calculator.component.css']
})
export class RateCalculatorComponent implements OnInit {
  pricing:PricingModel;
  LoanBalance:string;
  COFCurrent:string;
  COFConv:string;
  SpreadCurrent:string;
  SpreadConv:string;
  grossRateCurrent:string = '0.0%';
  grossRateConverted:string='0.0%';
  annualEarnBorrowCur:string;
  annualEarnBorrowConv:string;
  annualEarnCapitalCur:string  = '$0.0';
  annualEarnCapitalConv:string = '$0.0';
  annualIntEarnCur:string;
  annualIntEarnConv:string;
  interestChange:string = '0.0%';

  formCalc:FormGroup
  
  constructor(private loanservice:LoanDataService,private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.loanservice.cast.subscribe((data)=>{
      this.pricing = data
      console.log('pricing ',this.pricing)
      this.COFConv = this.pricing.COF1
      this.SpreadConv=this.pricing.finalSpread1;
      this.LoanBalance=this.pricing.loanAmnt;
    
    });
    
    this.formCalc = this.formBuilder.group({
      CurrentCof:0,
      CurrentSpread: 0
      
    });
  }

  updateCurrentCofCalc(event){
    console.log('updateCurrentCofCalc ',event.target.value)
    var uy = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(event.target.value);
    this.formCalc.patchValue({ CurrentCof: uy });

  }

  updateCurrentSpreadCalc(value){

  }
}