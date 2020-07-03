import { Component, OnInit } from '@angular/core';
import {CapitalService} from "@service/capital.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-mobile-capital-proxy-yes',
  templateUrl: './mobile-capital-proxy-yes.component.html',
  styleUrls: ['./mobile-capital-proxy-yes.component.less']
})
export class MobileCapitalProxyYesComponent implements OnInit {
    // 代理的数据统计信息
  public agentData: any = null;
    //显示提取佣金
    dailyTxt: boolean = false;
  constructor(public capitalService: CapitalService, public message: NzMessageService) { }
  ngOnInit() {
      //获取代理数据
      this.capitalService.getSelfAgent().subscribe(res => {
          if (res.status === 10000) {
              const idata = res.data;
              this.agentData = idata;
              this.dailyTxt = idata.withdraw;
          } else {
              this.message.error(res.msg);
          }
      });
  }

}
