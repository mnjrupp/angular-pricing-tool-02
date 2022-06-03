import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class GlobalDataService {
  // Set up default boolean variables for page display
  isShown = true;
  isShownCustomer = false;
  isShownAmort1 = false;
  isShownAmort2 = false;
  isShownAmort3 = false;
  isShownChartInt = false;
  isShownChartPay = false;
  isShownCalc = false;
  private toggleMessage=new BehaviorSubject(this.isShown);
  currentToggleMessage = this.toggleMessage.asObservable();

  constructor() { }
  
  toggleisShown(message:boolean){
    this.toggleMessage.next(message);
  }


}