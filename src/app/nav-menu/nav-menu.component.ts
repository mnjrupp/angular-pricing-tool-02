import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from '../shared/global-data.service'

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private globaldata:GlobalDataService) { }

  isExpanded:boolean = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  ngOnInit() {
    this.globaldata.currentToggleMessage.subscribe();
  }
  // The following functions are used to toggle the visability of the 
  // components
  toggleShowLoanOfficerTrue(){
    this.globaldata.toggleisShown('Loan')
  }
  toggleShowCustomerTrue(){
    this.globaldata.toggleisShown('Cust')
  }
  toggleShowAmortOneTrue(){
    this.globaldata.toggleisShown('Amort1')
  }
  toggleShowAmortTwoTrue(){
    this.globaldata.toggleisShown('Amort2')
  }
  toggleShowAmortThreeTrue(){
    this.globaldata.toggleisShown('Amort3')
  }
  toggleShowChartIntTrue(){
    this.globaldata.toggleisShown('Chart1')
  }

  toggleShowChartPayTrue(){
    this.globaldata.toggleisShown('Chart2')
  }

  toggleShowCalcTrue(){
    this.globaldata.toggleisShown('Calc')
  }

}