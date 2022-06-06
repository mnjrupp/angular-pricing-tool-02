import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoolValues } from '../boolValues';
@Injectable()
export class GlobalDataService {
  // Set up default boolean variables for page display

  private boolValues: BoolValues = {
    isShown: true,
    isShownCustomer: false,
    isShownAmort1: false,
    isShownAmort2: false,
    isShownAmort3: false,
    isShownChartInt: false,
    isShownChartPay: false,
    isShownCalc: false,
  };

  private boolValuesLO: BoolValues = {
    isShown: true,
    isShownCustomer: false,
    isShownAmort1: false,
    isShownAmort2: false,
    isShownAmort3: false,
    isShownChartInt: false,
    isShownChartPay: false,
    isShownCalc: false,
  };
  private boolValuesCUST: BoolValues = {
    isShown: false,
    isShownCustomer: true,
    isShownAmort1: false,
    isShownAmort2: false,
    isShownAmort3: false,
    isShownChartInt: false,
    isShownChartPay: false,
    isShownCalc: false,
  };

  private boolValuesAmort1: BoolValues = {
    isShown: false,
    isShownCustomer: false,
    isShownAmort1: true,
    isShownAmort2: false,
    isShownAmort3: false,
    isShownChartInt: false,
    isShownChartPay: false,
    isShownCalc: false,
  };
  private boolValuesAmort2: BoolValues = {
    isShown: false,
    isShownCustomer: false,
    isShownAmort1: false,
    isShownAmort2: true,
    isShownAmort3: false,
    isShownChartInt: false,
    isShownChartPay: false,
    isShownCalc: false,
  };
  private boolValuesAmort3: BoolValues = {
    isShown: false,
    isShownCustomer: false,
    isShownAmort1: false,
    isShownAmort2: false,
    isShownAmort3: true,
    isShownChartInt: false,
    isShownChartPay: false,
    isShownCalc: false,
  };
  private boolValuesChartInt: BoolValues = {
    isShown: false,
    isShownCustomer: false,
    isShownAmort1: false,
    isShownAmort2: false,
    isShownAmort3: false,
    isShownChartInt: true,
    isShownChartPay: false,
    isShownCalc: false,
  };

  private boolValuesChartPay: BoolValues = {
    isShown: false,
    isShownCustomer: false,
    isShownAmort1: false,
    isShownAmort2: false,
    isShownAmort3: false,
    isShownChartInt: false,
    isShownChartPay: true,
    isShownCalc: false,
  };

  private boolValuesCalc: BoolValues = {
    isShown: false,
    isShownCustomer: false,
    isShownAmort1: false,
    isShownAmort2: false,
    isShownAmort3: false,
    isShownChartInt: false,
    isShownChartPay: false,
    isShownCalc: true,
  };
  private toggleMessage = new BehaviorSubject(this.boolValues);
  currentToggleMessage = this.toggleMessage.asObservable();

  constructor() {}

  toggleisShown(message) {
    var newBoolValues: BoolValues;
    switch (message) {
      case 'Loan':
        newBoolValues = this.boolValuesLO;
        break;
      case 'Cust':
        newBoolValues = this.boolValuesCUST;
        break;
      case 'Amort1':
        newBoolValues = this.boolValuesAmort1;
        break;
      case 'Amort2':
        newBoolValues = this.boolValuesAmort2;
        break;
      case 'Amort3':
        newBoolValues = this.boolValuesAmort3;
        break;
      case 'Chart1':
        newBoolValues = this.boolValuesChartInt;
        break;
      case 'Chart2':
        newBoolValues = this.boolValuesChartPay;
        break;
      case 'Calc':
        newBoolValues = this.boolValuesCalc;
        break;
    }
    console.log('global-data newBoolValues', newBoolValues);
    this.toggleMessage.next(newBoolValues);
  }
}
