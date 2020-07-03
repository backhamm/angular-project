import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CapitalService } from '@service/capital.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import {ResponseBody} from "@src/app/types/common.type";
import { UserService } from '@service/user.service';
import { ConfigService } from '@src/app/config/config.service';

@Component({
    selector: 'app-capital-proxy-yes',
    templateUrl: './capital-proxy-yes.component.html',
    styleUrls: ['./capital-proxy-yes.component.less']
})
export class CapitalProxyYesComponent implements OnInit {

    //代理数据
    agentData: any = {
        regDate: undefined
    };
    //邀请方式
    inviteType: any;
    typeLoading: boolean = false;
    //邀请记录
    inviteData: any = [];
    invitePage = {
        page: 1,
        size: 10,
        total: 0
    };
    inviteLoading: boolean = false;
    //每日佣金
    dailyData: any = [];
    dailyPage = {
        page: 1,
        size: 10,
        total: 0
    };
    dailyLoading: boolean = false;
    dailyTimes: Date[] = [new Date(), new Date()];
    //显示提取佣金
    dailyTxt: boolean = false;
    //提取佣金Model
    dailyVisible: boolean = false;
    //提佣记录
    recordData: any = [];
    recordPage = {
        page: 1,
        size: 10,
        total: 0
    };
    recordLoading: boolean = false;
    recordTimes: Date[] = [new Date(), new Date()];
    //团队管理
    teamData: any = [];
    teamPage = {
      page: 1,
      size: 10,
      total: 0
    };
    teamLoading: boolean = false;
    teamTimes: Date[] = [new Date(), new Date()];
    // 默认选择
    typeSelect: any = 0;
    // 快捷选时
    quickSeletArr: { value: string, type: number }[] = [
      {value: '全部', type: 0},
      {value: '直属', type: 1},
      {value: '团队', type: 2}
    ];
    teamDataType: any;
    //团队组成图形
    chartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      color: ['#E55B48', '#FFCC99'],
      series: [
        {
          name: '直属会员',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 135, name: '直属会员'},
            {value: 1548, name: '团队会员'}
          ]
        }
      ]
    };
    //近期佣金
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['直属会员', '团队会员']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      color: ['#3AA1FF', '#4ECB73'],
      xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直属会员',
          type: 'bar',
          data: [320, 1332, 500, 800, 1300, 1200, 950],
          barWidth: 10
        },
        {
          name: '团队会员',
          type: 'bar',
          data: [1200, 1320, 1010, 1304, 900, 2030, 2010],
          barWidth: 10
        },
      ]
    };


    constructor(
        public service: CapitalService,
        public message: NzMessageService,
        public router: Router,
        public user: UserService,
        public config: ConfigService
    ) { }

    ngOnInit() {
        this.pageInit();
    }

    //获取用户名
    get username(): string {
      return this.user.user.username;
    }

    pageInit(): void {
        //获取代理数据
        this.service.getSelfAgent().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                const idata = res.data;
                this.agentData = idata;
                this.dailyTxt = idata.withdraw;
            } else {
                this.message.error(res.msg);
            }
        });
        this.getInviteType();
        this.getInviteList();
        this.getTeamList();
        this.getDailyData();
        this.getRecordData();
    }

    /**
     * @description: 提取佣金
     * @author: table
     */
    getWithdrawlComm(): void {
        let params = {
            amount: this.agentData.outstandingCommissions,
            commissionBeginDate: this.agentData.commissionBeginDate,
            commissionEndDate: this.agentData.commissionEndDate,
        };
        this.service.getWithdrawlComm(params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.message.success(res.msg);
                setTimeout(() => {
                    this.pageInit();
                }, 1000);
            } else {
                this.message.error(res.msg);
                if (res.status === 40000) {
                    this.router.navigateByUrl('center/withdraw');
                }
            }

        });
    }
    /**
     * @description: 获取每日佣金
     * @author: table
     */
    getRecordData(): void {
        this.recordLoading = true;
        let params = {
            pageSize: this.recordPage.size,
            pageNo: this.recordPage.page,
            startTime: this.dateFormate(this.recordTimes[0]),
            endTime: this.dateFormate(this.recordTimes[1], true)
        };
        this.service.getCommissionRecord(params).subscribe((res: ResponseBody) => {
            this.recordLoading = false;
            if (res.status === 10000) {
                const idata = res.data;
                this.recordData = idata.list;
                this.recordPage.page = idata.pageNo;
                this.recordPage.total = idata.total;
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 获取每日佣金
     * @author: table
     */
    getDailyData(): void {
        this.dailyLoading = true;
        let params = {
            pageSize: this.dailyPage.size,
            pageNo: this.dailyPage.page,
            startTime: this.dateFormate(this.dailyTimes[0]),
            endTime: this.dateFormate(this.dailyTimes[1], true)
        };
        this.service.getCommissionPage(params).subscribe((res: ResponseBody) => {
            this.dailyLoading = false;
            if (res.status === 10000) {
                const idata = res.data;
                this.dailyData = idata.list;
                this.dailyPage.page = idata.pageNo;
                this.dailyPage.total = idata.total;
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 获取邀请方式
     * @author: table
     */
    getInviteType(): void {
        this.typeLoading = true;
        this.service.getInviteType().subscribe((res: ResponseBody) => {
            this.typeLoading = false;
            if (res.status === 10000) {
                this.inviteType = res.data;
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 获取邀请记录
     * @author: table
     */
    getInviteList(): void {
        this.inviteLoading = true;
        let params = {
            pageSize: this.invitePage.size,
            pageNo: this.invitePage.page,
        };
        this.service.getInviteList(params).subscribe((res: ResponseBody) => {
            this.inviteLoading = false;
            if (res.status === 10000) {
                const idata = res.data;
                this.inviteData = idata.list;
                this.invitePage.page = idata.pageNo;
                this.invitePage.total = idata.total;
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 复制
     * @author: table
     * @param value 状态
     */
    copied(value: any): void {
      alert(111);
        if (value.isSuccess) {
            this.message.success('复制成功');
        } else {
            this.message.success('复制失败');
        }
    }

    onChange(value: any): void {
        this.dailyTimes = value;
        this.getDailyData();
    }
    onChange1(value: any): void {
        this.recordTimes = value;
        this.getRecordData();
    }

    /**
     * @description: 时间格式化
     * @author: table
     * @param date 时间
     * @param end 是否是结束时间
     * @return: 2017-07-10 00:00:00
     */
    dateFormate(date: Date, end: boolean = false): string {
        let year = date.getFullYear();
        let month = ('00' + (date.getMonth() + 1)).slice(-2);
        let day = ('00' + date.getDate()).slice(-2);
        if (end) {
            return `${year}-${month}-${day} 23:59:59`;
        } else {
            return `${year}-${month}-${day} 00:00:00`;
        }
    }

  /**
   * @description: 团队管理
   * @author: zeal
   */
    //切换table显示直属、团队显示人数与ID
    quickTypeChange(type: number): void {
      this.typeSelect = type;
      if (type === 0) {
        this.teamDataType = '旗下会员/上级id';
      }
      if (type === 1) {
        this.teamDataType = '旗下会员';
      }
      if (type === 2) {
        this.teamDataType = '上级id';
      }
    }

    getTeamList(): void {
      this.typeSelect = 0;
      this.teamDataType = '旗下会员/上级id';
    }

}
