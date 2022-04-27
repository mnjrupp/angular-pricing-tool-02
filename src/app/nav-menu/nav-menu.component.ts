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
  toggleShow(){
    this.globaldata.toggleisShown(true)
  }

}