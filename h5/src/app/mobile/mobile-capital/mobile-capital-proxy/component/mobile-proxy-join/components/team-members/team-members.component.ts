import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "@src/app/config/config.service";
import {CapitalService} from "@service/capital.service";

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.less']
})

export class TeamMembersComponent implements OnInit {

  public params: Params;
  public recordList: Array<any> = [];
  public pageSize = 10;
  public pageNo = 1;
  public isLoading = true;

  constructor(
    public capital: CapitalService,
    public config: ConfigService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.params = this.route.snapshot.queryParams;
    this.getBrokerageDetail();
  }

  // 下拉刷新
  moveEnd(callback) {
    this.pageNo++;
    this.getBrokerageDetail(callback);
  }

  // 获取提取记录
  getBrokerageDetail(callback = null) {
    this.capital.getBrokerageDetail({
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      agencyUid: this.params.agencyUid,
    }).subscribe(res => {
      this.isLoading = false;
      if (res.status === undefined) {
        if (callback) {
          callback(!!res.list.length);
          !res.list.length && this.pageNo--;
          this.recordList = [...res.list, ...this.recordList];
        } else {
          this.recordList = res.list;
        }
      } else {
        this.recordList = [];
        callback && callback();
      }
    });
  }
}

interface Params {
  isTeam?: string | number;
  username?: string;
  totalBetAmount?: string;
  agencyLevel?: string;
  topUsername?: string;
  directNum?: string;
  todayBetAmount?: string;
  agencyUid?: string;
}
