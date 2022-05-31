import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-charts-payment-compare',
  templateUrl: './payment-compare.component.html',
  styleUrls: ['./payment-compare.component.css']
})
export class PaymentCompareComponent implements OnInit {

  dataArray: any = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let data: any,
      options: any,
      chart: any,
      ctx: any = document.getElementById('areaChart') as HTMLElement;

    // Stackblitz no longer supports local json files.
    // Uncomment below and use import at top.
    // Replace datasets with this.dataArray

    // for (let key in chartData.items) {
    //   if (chartData.items.hasOwnProperty(key)) {
    //     this.dataArray.push(chartData.items[key]);
    //   }
    // }

    data = {
      labels: ['Scenario 1', 'Scenario 2', 'Scenario 3'],
      datasets: [
        {
          label: 'Scenario 1',
          data: [0, 50, 45, 100],
          backgroundColor: 'rgba(40,125,200,.5)',
          borderColor: 'rgb(40,100,200)',
          fill: false,
          lineTension: 0,
          radius: 5,
        },
        {
          label: 'Scenario 2',
          data: [30, 90, 111, 20],
          backgroundColor: 'rgba(138,11,26,.5)',
          borderColor: 'rgb(138,11,26)',
          fill: false,
          lineTension: 0.2,
          radius: 5,
        },
        {
          label: 'Scenario 3',
          data: [20, 70, 75, 80],
          backgroundColor: 'rgba(11,138,93,.5)',
          borderColor: 'rgb(11,138,93)',
          fill: false,
          lineTension: 0.2,
          radius: 5,
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