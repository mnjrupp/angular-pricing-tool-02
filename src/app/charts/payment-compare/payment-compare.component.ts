import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {PaymentModel} from '../../payment-model';
import { PricingModel } from '../../pricing-model';
import { LoanDataService } from '../../shared/loan-data.service';
import {PaymentDataService} from '../../shared/payment-data.service';
@Component({
  selector: 'app-charts-payment-compare',
  templateUrl: './payment-compare.component.html',
  styleUrls: ['./payment-compare.component.css']
})
export class PaymentCompareComponent implements OnInit {

  dataArray: any = [];
  pricing: PricingModel;
  payments:any[] = []
  constructor(private loanservice: LoanDataService,private paymentservice:PaymentDataService) { }

  ngOnInit() {
    this.loanservice.cast.subscribe((data) => {
      this.pricing = data;
      this.payments[0] = this.paymentservice.buildpayments(this.pricing,1);
      this.payments[1] = this.paymentservice.buildpayments(this.pricing,2);
      this.payments[2] = this.paymentservice.buildpayments(this.pricing,3);
     
    });
  }

  ngAfterViewInit() {
    let data: any,
      options: any,
      chart: any,
      ctx: any = document.getElementById('areaChart') as HTMLElement;

   

    data = {
      labels: ['Scenario 1', 'Scenario 2', 'Scenario 3'],
      datasets: [
        {
          label: this.pricing.AmorType1,
          data: [0, 50, 45, 100],
          backgroundColor: 'rgba(40,125,200,.5)',
          borderColor: 'rgb(40,100,200)',
          fill: false,
          lineTension: 0,
          radius: 2,
        },
        {
          label: this.pricing.AmorType2,
          data: [30, 90, 111, 20],
          backgroundColor: 'rgba(138,11,26,.5)',
          borderColor: 'rgb(138,11,26)',
          fill: false,
          lineTension: 0.2,
          radius: 2,
        },
        {
          label: this.pricing.AmorType3,
          data: [20, 70, 75, 80],
          backgroundColor: 'rgba(11,138,93,.5)',
          borderColor: 'rgb(11,138,93)',
          fill: false,
          lineTension: 0.2,
          radius: 2,
        },
      ],
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        position: 'top',
        text: 'Apples to Oranges',
        fontSize: 12,
        fontColor: '#666',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#999',
          fontSize: 14,
        },
      },
    };

    chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }

}