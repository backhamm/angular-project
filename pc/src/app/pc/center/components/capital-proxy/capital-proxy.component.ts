import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@src/app/config/config.service';
import { CapitalService } from '@service/capital.service';
import { UserService } from '@service/user.service';
import {ResponseBody} from "@src/app/types/common.type";
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-capital-proxy',
    templateUrl: './capital-proxy.component.html',
    styleUrls: ['./capital-proxy.component.less']
})
export class CapitalProxyComponent implements OnInit {

    //轮播
    commissionList: any;
    //代理数据
    agentData: AgentData = {
      yesterdayAgent: 0,
      totalOfCommission: 0,
      totalAgent: 0
    };

    //用户代理情况
    status: number = -1;
    agentStatus = 2;

    //底部介绍信息
    proxyIntr: any = {
        rules: `${this.config.baseImgUrl}wxdl/banner_null.jpg`,
        others: `${this.config.baseImgUrl}wxdl/banner_null.jpg`
    };

    constructor(
        public config: ConfigService,
        public service: CapitalService,
        public message: NzMessageService,
        public user: UserService
    ) { }

    ngOnInit( ) {

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

        //获取会员代理等级
        this.user.getUserInfo().subscribe(() => {
            const agencyStatus = this.user.userInfo.agencyStatus;
            this.status = agencyStatus;
            if (this.status !== 1) {
                this.getCopyPictures();
            }
        });
    }


    /**
     * @description: 获取底部图文介绍
     * @author: table
     */
    getCopyPictures(): void {
        this.service.getProxyConfig().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                const idata = res.data;
                this.proxyIntr.rules = idata.pcCalculate;
                this.proxyIntr.others = idata.pcOther;
            }
        });
    }

    /**
     * @description: 接收 加入代理传值
     * @author: table
     */
    checkedBack(value: number) {
        this.status = value;
    }

    /**
     * @description: 加入代理
     * @author: table
     */
    joinAgent(): void {
      this.service.joinAgent().subscribe((res: ResponseBody) => {
        if (res.status === 10000) {
          this.message.success(res.msg);
        } else {
          this.message.error(res.msg);
        }
      });
    }
}

interface AgentData {
  yesterdayAgent: number;
  totalOfCommission: number;
  totalAgent: number;
}
