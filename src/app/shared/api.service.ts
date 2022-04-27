import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { CostOfFundsRequest } from '../costoffunds-request-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /*This is the FCBTCostOfFunds API */
  postCostofFunds(data: CostOfFundsRequest[]): Observable<any> {
    console.log('postCostofFunds ',data);
    return this.http.post("http://lstsqldev01.nterprise.net:8082/api/FCBTCostOfFunds", data)
     /* .pipe(map((res: any) => {
        return res;
      }))*/
  }

}
