import { Component, OnInit } from '@angular/core';
import {CommonService} from "@service/common.service";

@Component({
  selector: 'app-notice-alert',
  templateUrl: './notice-alert.component.html',
  styleUrls: ['./notice-alert.component.less']
})
export class NoticeAlertComponent implements OnInit {

  constructor(public common: CommonService) { }

  ngOnInit() {
  }

}
