import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaymentModel} from '../payment-model';

@Injectable()
export class PaymentDataService {
 paymentmodel:PaymentModel[] = [{
  paymentnum: '',
  payDate: '',
  balance: '',
  payment: '',
  principal: '',
  interest: '',
  endbalance: '',
  cumulativeint: '',
  TotalInt:0,
  AmorType:''
},];

 private payments = new BehaviorSubject<PaymentModel[]>(this.paymentmodel);

 cast = this.payments.asObservable();
  constructor() { }

  editModel(newModel){
    this.payments.next(newModel);
  }

}