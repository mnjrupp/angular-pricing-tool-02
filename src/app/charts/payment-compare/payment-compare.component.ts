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
  payments1:PaymentModel[] ;
  payments2:PaymentModel[] ;
  payments3:PaymentModel[] ;
  ctx: any ;
  lineChart:Chart;
  chartLabels:any = [];

  constructor(private loanservice: LoanDataService,private paymentservice:PaymentDataService) { }

  ngOnInit() {
    this.loanservice.cast.subscribe((data) => {
      this.pricing = data;
      this.payments1 = this.paymentservice.buildpayments(this.pricing,1);
     console.log('payments1 ',this.payments1.map(d=>d.cumpayment))
      this.payments2 = this.paymentservice.buildpayments(this.pricing,2);
      //console.log('payments2 ',this.payments2['cumpayment'])
      this.payments3 = this.paymentservice.buildpayments(this.pricing,3);
     this.chartLabels= this.paymentservice.buildPaymentDates(this.pricing.AmorTerm1,
                                            this.pricing.AmorTerm2,
                                            this.pricing.AmorTerm3,
                                            this.pricing.loanDate,
                                            this.pricing.paymentfreq);
    // console.log('chartLabels ',this.chartLabels);
    if(this.lineChart){
      this.lineChart.data.labels=this.chartLabels;
     this.lineChart.data.datasets[0].data=this.payments1.map(d=>d.cumpayment)
     this.lineChart.data.datasets[1].data=this.payments2.map(d=>d.cumpayment)
     this.lineChart.data.datasets[2].data=this.payments3.map(d=>d.cumpayment)
     this.lineChart.update();
    // console.log('lineChart ',this.lineChart)
      }
    });
  }

  ngAfterViewInit() {
    this.ctx= document.getElementById('areaChart') as HTMLElement;
   // this.chart = new Chart(this.ctx)
   this.buildChartInterface();
  }

  updateChart(){
   console.log('Chart object ',this.lineChart)
    this.removeChartData(this.lineChart);
    //this.addChartData(this.chart)
    this.buildChartInterface();

  }

 
  removeChartData(chart){
     
      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
  }

  addChartData(chart,data,label){
      chart.data.labels.push(label)
      chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }
  buildChartInterface(){
    let data: any,
    options: any;
   
    /*canvas:any = document.getElementById('areaChart') as HTMLElement;
    console.log('canvas object ',canvas);
    canvas.remove();
    let division: any = document.getElementById('myChart') as HTMLElement;
        division.append('<canvas id="areaChart"></canvas>');*/
   
    //ctx.destroy();
 

  data = {
    labels: ['Scenario 1', 'Scenario 2', 'Scenario 3'],
    datasets: [
      {
        label: this.pricing.AmorType1,
        data: this.payments1.map(d=>d.cumpayment),
        backgroundColor: 'rgba(40,125,200,.5)',
        borderColor: 'rgb(40,100,200)',
        fill: false,
        lineTension: 0,
        radius: 2,
      },
      {
        label: this.pricing.AmorType2,
        data:this.payments2.map(d=>d.cumpayment),
        backgroundColor: 'rgba(138,11,26,.5)',
        borderColor: 'rgb(138,11,26)',
        fill: false,
        lineTension: 0.2,
        radius: 2,
      },
      {
        label: this.pricing.AmorType3,
        data: this.payments3.map(d=>d.cumpayment),
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
  console.log('this.ctx ',this.ctx)
  console.log('this.chart ',this.lineChart)
  this.lineChart = new Chart(this.ctx, {
    type: 'line',
    data: data,
    options: options,
  });
 
}
  }
