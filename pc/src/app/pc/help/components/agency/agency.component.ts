import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../help.service';
import {ConfigService} from "@src/app/config/config.service";

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.less']
})
export class AgencyComponent implements OnInit {
  public currentIndex:number = 0
  constructor(
    public service: HelpService,
    public config: ConfigService
  ) { }

  ngOnInit() {
  }

  changeItem(i:number):void{
    this.currentIndex = i
  }
}
