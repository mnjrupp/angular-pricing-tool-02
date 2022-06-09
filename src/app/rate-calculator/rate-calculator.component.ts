import { Component, OnInit } from '@angular/core';
import {LoanDataService} from '../shared/loan-data.service';
import {PricingModel} from '../pricing-model';

@Component({
  selector: 'app-rate-calculator',
  templateUrl: './rate-calculator.component.html',
  styleUrls: ['./rate-calculator.component.css']
})
export class RateCalculatorComponent implements OnInit {
  pricing:PricingModel;
  constructor(private loanservice:LoanDataService) { }

  ngOnInit() {
    this.loanservice.cast.subscribe(data=>this.pricing = data);
  }

}