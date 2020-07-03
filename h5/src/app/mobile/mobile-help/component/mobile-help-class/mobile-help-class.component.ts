import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "@service/common.service";

import helpObj from "../../help";

@Component({
  selector: 'app-mobile-help-class',
  templateUrl: './mobile-help-class.component.html',
  styleUrls: ['./mobile-help-class.component.less']
})
export class MobileHelpClassComponent implements OnInit {
    private issueTitle: string = '';
    public issueList: Array<object> = [];

  constructor(
      public route: ActivatedRoute,
      public commonService: CommonService
  ) { }

  ngOnInit() {
      let issueId = this.route.snapshot.paramMap.get('id');
      this.issueTitle = this.route.snapshot.paramMap.get('title');
      this.issueList = helpObj[issueId];
      this.commonService.commonRouteTitle = this.issueTitle;
  }

}
