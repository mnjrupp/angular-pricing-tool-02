import { Component, OnInit } from '@angular/core';
import {LoanDataService} from '../shared/loan-data.service';
import {PricingModel} from '../pricing-model';
import Patronage from '../../assets/PatHist.json';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  pricing:PricingModel;
  patronage:any;
  constructor(private loanservice:LoanDataService) { 
    this.patronage=Patronage;
  }

  ngOnInit() {
    this.loanservice.cast.subscribe(data=>this.pricing = data);
  }

}