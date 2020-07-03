import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {CapitalService} from "@service/capital.service";

@Component({
  selector: 'app-mobile-capital-proxy-no',
  templateUrl: './mobile-capital-proxy-no.component.html',
  styleUrls: ['./mobile-capital-proxy-no.component.less']
})
export class MobileCapitalProxyNoComponent implements OnInit {
    // loading加载中
    public isLoading: boolean = false;
    @Input() appBanner: any = '';
    //轮播
    public  commissionList: any;
    //代理数据
    public agentData: AgentData = {
        yesterdayAgent: 0,
        totalOfCommission: 0,
        totalAgent: 0
    };
    //加入代理传值
    public status: number;

    constructor(
        public capitalService: CapitalService,
        public message: NzMessageService,
    ) { }

    ngOnInit() {
        this.isLoading = true;
        //获取滚动佣金
        this.capitalService.getProxyCarousel().subscribe(res => {
            this.isLoading = false;
            this.commissionList = res;
        });

        //获取代理数据
        this.capitalService.getAgentData().subscribe(res => {
            if (res.status === 10000) {
                this.agentData = res.data;
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

