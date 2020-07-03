import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { CapitalService } from '@service/capital.service';
import { NzMessageService } from 'ng-zorro-antd';
import {ResponseBody} from "@src/app/types/common.type";
import { ConfigService } from '@src/app/config/config.service';

@Component({
  selector: 'app-capital-proxy-infor',
  templateUrl: './capital-proxy-infor.component.html',
  styleUrls: ['./capital-proxy-infor.component.less']
})
export class CapitalProxyInforComponent implements OnInit {

  @Output() checked = new EventEmitter();
  //轮播
  commissionList: any;
  //代理数据
  agentData: AgentData = {
    yesterdayAgent: 0,
    totalOfCommission: 0,
    totalAgent: 0
  };
  //加入代理传值
  status: number;

  constructor(
    public service: CapitalService,
    public message: NzMessageService,
    public config: ConfigService,
    public router: Router
  ) { }

  ngOnInit() {
    //获取滚动佣金
    this.service.getProxyCarousel().subscribe(res => {
      this.commissionList = res;
    });

    //获取代理数据
    this.service.getAgentData().subscribe((res: ResponseBody) => {
      if (res.status === 10000) {
        this.agentData = res.data;
      } else {
        this.message.error(res.msg);
      }
    });
  }

  /**
   * @description: 加入代理
   * @author: table
   */
  joinAgent(): void {
    this.router.navigate(['/center/proxy']);
  }

}
interface AgentData {
  yesterdayAgent: number;
  totalOfCommission: number;
  totalAgent: number;
}
