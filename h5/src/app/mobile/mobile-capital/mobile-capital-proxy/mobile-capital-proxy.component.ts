import {Component, OnInit} from '@angular/core';
import {UserService} from "@service/user.service";
import {CapitalService} from "@service/capital.service";
import {ConfigService} from "@src/app/config/config.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-mobile-capital-proxy',
  templateUrl: './mobile-capital-proxy.component.html',
  styleUrls: ['./mobile-capital-proxy.component.less']
})
export class MobileCapitalProxyComponent implements OnInit {

  // 代理是否加入判定 agencyStatus  代理状态 0-加入 1-停用 2-未加入 3-停用显示页面  4-显示详细规则
  isJoin = 0;

  //用户代理情况
  constructor(
    public configService: ConfigService,
    public capitalService: CapitalService,
    public userService: UserService,
    public message: NzMessageService
  ) {
  }

  ngOnInit() {

  }

  joinAgent() {
    this.isJoin = 0;
  }
}
