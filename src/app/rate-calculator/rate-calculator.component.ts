import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoanDataService } from '../shared/loan-data.service';
import { PricingModel } from '../pricing-model';

@Component({
  selector: 'app-rate-calculator',
  templateUrl: './rate-calculator.component.html',
  styleUrls: ['./rate-calculator.component.css'],
})
export class RateCalculatorComponent implements OnInit {
  pricing: PricingModel;
  LoanBalance: string;
  COFCurrent: number = 0.0;
  COFConv: string;
  SpreadCurrent: number = 0.0;
  SpreadConv: string;
  grossRateCurrent: string = '0.0%';
  grossRateConverted: string = '0.0%';
  annualEarnBorrowCur: string;
  annualEarnBorrowConv: string;
  annualEarnCapitalCur: string = '$0.0';
  annualEarnCapitalConv: string = '$0.0';
  annualIntEarnCur: string;
  annualIntEarnConv: string;
  acaCapCurrent: string = this.loanservice.formatPercent(0.16);
  acaCapConv: string = this.loanservice.formatPercent(0.16);
  interestChange: string = '0.0%';

  formCalc: FormGroup;

  constructor(
    private loanservice: LoanDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loanservice.cast.subscribe((data) => {
      this.pricing = data;
      //console.log('pricing ', this.pricing);
      this.COFConv = this.pricing.COF1;
      this.SpreadConv = this.pricing.finalSpread1;
      this.LoanBalance = this.pricing.loanAmnt;

      this.updateCurrentElements();
    });

    this.formCalc = this.formBuilder.group({
      CurrentCof: 0,
      CurrentSpread: 0,
    });
  }

  updateCurrentCofCalc(event) {
    //console.log('updateCurrentCofCalc ',event.target.value)
    var uy = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(event.target.value);
    this.COFCurrent = Number(event.target.value);
    this.formCalc.patchValue({ CurrentCof: uy });
    this.updateCurrentElements();
  }

  updateCurrentSpreadCalc(event) {
    var uy = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(event.target.value);
    this.SpreadCurrent = Number(event.target.value);
    this.formCalc.patchValue({ CurrentSpread: uy });
    this.updateCurrentElements();
  }

  updateCurrentElements() {
    var grossRate = this.COFCurrent + this.SpreadCurrent;
    /*console.log(
      'updateCurrentElements() ',
      this.COFCurrent + '~' + this.SpreadCurrent
    );*/
    this.grossRateCurrent = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(grossRate);

    //update Rate Calc Fields
    this.grossRateConverted = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(
      (Number(this.loanservice.unformatNumber(this.COFConv)) +
        Number(this.loanservice.unformatNumber(this.SpreadConv))) /
        100
    );
    this.annualEarnBorrowCur = this.loanservice.formatCurrency(
      Number(this.loanservice.unformatNumber(this.LoanBalance)) *
        this.SpreadCurrent *
        (1 - Number(this.loanservice.unformatNumber(this.acaCapCurrent)) / 100)
    );
    this.annualEarnBorrowConv = this.loanservice.formatCurrency(
      Number(this.loanservice.unformatNumber(this.LoanBalance)) *
        (Number(this.loanservice.unformatNumber(this.SpreadConv)) / 100) *
        (1 - Number(this.loanservice.unformatNumber(this.acaCapCurrent)) / 100)
    );
    this.annualEarnCapitalCur = this.loanservice.formatCurrency(
      Number(this.loanservice.unformatNumber(this.LoanBalance)) *
        (Number(this.loanservice.unformatNumber(this.grossRateCurrent)) / 100) *
        (Number(this.loanservice.unformatNumber(this.acaCapCurrent)) / 100)
    );

    this.annualEarnCapitalConv = this.loanservice.formatCurrency(
      Number(this.loanservice.unformatNumber(this.LoanBalance)) *
        (Number(this.loanservice.unformatNumber(this.grossRateConverted)) /
          100) *
        (Number(this.loanservice.unformatNumber(this.acaCapConv)) / 100)
    );

    this.annualIntEarnCur = this.loanservice.formatCurrency(
      Number(this.loanservice.unformatNumber(this.annualEarnCapitalCur)) +
        Number(this.loanservice.unformatNumber(this.annualEarnBorrowCur))
    );

    this.annualIntEarnConv = this.loanservice.formatCurrency(
      Number(this.loanservice.unformatNumber(this.annualEarnCapitalConv)) +
        Number(this.loanservice.unformatNumber(this.annualEarnBorrowConv))
    );
    // console.log('annual Int Earning Conv ',Number(this.loanservice.unformatNumber(this.annualIntEarnConv)))
    // console.log('annual Int Earning Current ',Number(this.loanservice.unformatNumber(this.annualIntEarnCur)))
    this.interestChange = this.loanservice.formatPercent(
      (Number(this.loanservice.unformatNumber(this.annualIntEarnConv)) /
        Number(this.loanservice.unformatNumber(this.annualIntEarnCur)))-1 
    );
  }
}
