import {Component, OnInit} from '@angular/core';
import {UserService} from "@service/user.service";
import {CapitalService} from "@service/capital.service";
import {ConfigService} from "@src/app/config/config.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-mobile-capital-proxy',
  templateUrl: './mobile-capital-proxy.component.html',
  styleUrls: ['./mobile-capital-proxy.component.less']
})
export class MobileCapitalProxyComponent implements OnInit {

  //用户代理情况
  constructor(
    public message: NzMessageService,
    public route: ActivatedRoute,
    public capital: CapitalService,
    public router: Router,
    public user: UserService
  ) {
  }

  ngOnInit() {
    if (!this.capital.proxyImage) {
      this.capital.getProxyImage();
    }
    this.capital.getProxyInfo();
  }

  // 代理是否加入判定 agencyStatus  代理状态 0-加入 1-停用 2-未加入 3-停用显示页面  4-显示详细规则
  get isJoin() {
    return this.user.userInfo.hasJoin;
  }

  joinAgent() {
    this.capital.joinAgent().subscribe(res => {
      if (res.status === 10000) {
        this.message.success(res.msg);
        this.user.userInfo.hasJoin = 0;
      } else {
        this.message.error(res.msg);
      }
    });
  }
}
