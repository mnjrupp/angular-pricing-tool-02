import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {BoolValues} from '../boolValues';
@Injectable()
export class GlobalDataService {
  // Set up default boolean variables for page display
  
  

  boolValues:BoolValues = {
  isShown: true,
  isShownCustomer: false,
  isShownAmort1: false,
  isShownAmort2:false,
  isShownAmort3: false,
  isShownChartInt:false,
  isShownChartPay:false,
  isShownCalc:false,
  }

  boolValuesLO:BoolValues = {
    isShown:true,
    isShownCustomer: false,
    isShownAmort1: false,
    isShownAmort2:false,
    isShownAmort3: false,
    isShownChartInt:false,
    isShownChartPay:false,
    isShownCalc:false,
    }
    boolValuesCUST:BoolValues = {
      isShown:false,
      isShownCustomer: true,
      isShownAmort1: false,
      isShownAmort2:false,
      isShownAmort3: false,
      isShownChartInt:false,
      isShownChartPay:false,
      isShownCalc:false,
      }


  private toggleMessage=new BehaviorSubject(this.boolValues);
  currentToggleMessage = this.toggleMessage.asObservable();

  constructor() { }
  
  toggleisShown(message){
    var newBoolValues:BoolValues
    switch(message){
      case 'Loan':
        newBoolValues=this.boolValuesLO;
        break;
      case 'Cust':
        newBoolValues=this.boolValuesCUST;
    }
    console.log('global-data newBoolValues',newBoolValues)
    this.toggleMessage.next(newBoolValues);
  }


}