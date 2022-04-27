import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class GlobalDataService {
  isShown = true;
  private toggleMessage=new BehaviorSubject(this.isShown);
  currentToggleMessage = this.toggleMessage.asObservable();

  constructor() { }
  
  toggleisShown(message:boolean){
    this.toggleMessage.next(message);
  }


}