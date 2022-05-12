import { Component, OnInit } from '@angular/core';
import {LoanDataService} from '../shared/loan-data.service';
import {PricingModel} from '../pricing-model';

@Component({
  selector: 'app-amort-sched-one',
  templateUrl: './amort-sched-one.component.html',
  styleUrls: ['./amort-sched-one.component.css']
})
export class AmortSchedOneComponent implements OnInit {
  pricing:PricingModel;


  constructor(private loanservice:LoanDataService) {

   }

  ngOnInit() {
    this.loanservice.cast.subscribe(data=> this.pricing = data);
  }

}