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
  toggleShowTrue(){
    this.globaldata.toggleisShown(true)
  }
  toggleShowFalse(){
    this.globaldata.toggleisShown(false)
  }

}