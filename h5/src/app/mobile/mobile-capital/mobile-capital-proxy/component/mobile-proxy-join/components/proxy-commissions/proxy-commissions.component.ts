import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlatformService} from "@service/platform.service";
import {ResponseBody} from "@src/app/types/common.type";
import {CapitalService} from "@service/capital.service";
import {NzMessageService} from "ng-zorro-antd";
import {UserService} from "@service/user.service";

@Component({
  selector: 'app-proxy-commissions',
  templateUrl: './proxy-commissions.component.html',
  styleUrls: ['./proxy-commissions.component.less']
})
export class ProxyCommissionsComponent implements OnInit {

  public userBank: string = '';

  constructor(
    public route: ActivatedRoute,
    public platform: PlatformService,
    public capital: CapitalService,
    public message: NzMessageService,
    public router: Router,
    public user: UserService
  ) {
  }

  get type() {
    return this.route.snapshot.queryParams['type'];
  }

  get optionsList() {
    return !this.capital.proxyInfo ? [
      {title: this.type === '1' ? '提取金额' : '转存金额', info: ''},
      {title: '计佣周期', info: ''},
      {title: '提取类型', info: ''},
      {title: this.type === '1' ? '银行卡' : '当前余额', info: ''}
    ] : [
      {title: this.type === '1' ? '提取金额' : '转存金额', info: this.capital.proxyInfo.unSettledCommission},
      {title: '计佣周期', info: `${this.capital.proxyInfo.commissionBeginDate} ~ ${this.capital.proxyInfo.commissionEndDate}`},
      {title: '提取类型', info: this.type === '1' ? '提现至银行卡' : '转存到中心钱包'},
      this.type === '1' ? {title: '银行卡', info: this.userBank} : {title: '当前余额', info: this.user.userInfo.wallet}
    ];
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.capital.getProxyInfo();
    if (this.type === '1') {
      this.user.getUserCard().subscribe(res => {
        this.userBank = `${res.data.bankName} (${res.data.cardNum.slice(-4)})`;
      });
    }
  }

  getWithdrawlComm(): void {
    const {commissionBeginDate, commissionEndDate, unSettledCommission} = this.capital.proxyInfo;
    const params = {
      withdrawAmount: unSettledCommission,
      commissionBeginDate,
      commissionEndDate,
      settlementType: this.type
    };
    this.capital.getWithdrawlComm(params).subscribe((res: ResponseBody) => {
      if (res.status === 10000) {
        this.capital.getProxyInfo(() => {
          this.message.success('提佣成功');
          this.router.navigate(['/m/capital/proxy']);
        });
        // 刷新用户信息内容
        this.capital.getProxyInfo();
      } else {
        this.message.error(res.msg);
      }
    });
  }

}
