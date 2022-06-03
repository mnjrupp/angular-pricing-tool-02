import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class GlobalDataService {
  // Set up default boolean variables for page display
  
  

  boolValues = {
  isShown: true,
  isShownCustomer: false,
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
    this.toggleMessage.next(message);
  }


}