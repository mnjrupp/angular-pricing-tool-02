import { Component, OnInit } from '@angular/core';
import {LoanDataService} from '../shared/loan-data.service';
import {PricingModel} from '../pricing-model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  pricing:PricingModel;
  constructor(private loanservice:LoanDataService) { }

  ngOnInit() {
    this.loanservice.cast.subscribe(data=>this.pricing = data);
  }

}