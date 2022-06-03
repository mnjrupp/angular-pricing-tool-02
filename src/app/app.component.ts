import { Component, VERSION,OnInit } from '@angular/core';
import {GlobalDataService} from './shared/global-data.service';
import {BoolValues} from './boolValues';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  isShown;
  boolValues:BoolValues;

  constructor(private globaldata:GlobalDataService) { }

 ngOnInit(){
   this.globaldata.currentToggleMessage.subscribe(msg => this.boolValues=msg)
 }
  

}