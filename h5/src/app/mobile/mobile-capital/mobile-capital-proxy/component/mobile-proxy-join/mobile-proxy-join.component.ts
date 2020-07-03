import {Component, OnInit} from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";
import {UserService} from "@service/user.service";
import {CapitalService} from "@service/capital.service";
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from "@angular/router";
import {ResponseBody} from "@src/app/types/common.type";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-mobile-proxy-join',
  templateUrl: './mobile-proxy-join.component.html',
  styleUrls: ['./mobile-proxy-join.component.less'],
  animations: [
    trigger('showMask', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms', style({opacity: 0}))
      ])
    ]),
    trigger('showBtn', [
      transition(':enter', [
        style({bottom: '-3rem'}),
        animate('200ms', style({bottom: 0}))
      ]),
      transition(':leave', [
        animate('200ms', style({bottom: '-3rem'}))
      ])
    ])
  ]
})
export class MobileProxyJoinComponent implements OnInit {
  // 邀请方式
  public invited: Invited;
  // 团队组成图表信息
  public teamChartInfo: TeamChartInfo = {
    directNum: 0,
    teamNum: 0
  };
  public showModel = false;
  public headerLink = [
    {icon: 'image/wxdl/agentIcon_01.png', name: '邀请记录', link: '/m/capital/proxy/inviteRecord'},
    {icon: 'image/wxdl/agentIcon_02.png', name: '团队管理', link: '/m/capital/proxy/teamManagement'},
    {icon: 'image/wxdl/agentIcon_03.png', name: '佣金流水', link: '/m/capital/proxy/brokerageRecord'},
    {icon: 'image/wxdl/agentIcon_04.png', name: '提佣记录', link: '/m/capital/proxy/extractRecord'},
  ];

  public textColor = '#fff';

  public teamOption = {};
  public brokerageOption = {};

  constructor(
    public config: ConfigService,
    public user: UserService,
    public capital: CapitalService,
    public message: NzMessageService,
    public router: Router
  ) {
  }

  get qrCodeSize() {
    return document.querySelector('.invite-main>.left-wrapper').clientWidth - 5;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.capital.getAgentInvited().subscribe(res => {
      if (res.status === 10000) {
        this.invited = res.data;
      }
    });
    this.capital.getTeamChartInfo().subscribe(res => {
      if (res.status === 10000) {
        this.teamOption = {
          color: ['#E45A47', '#CDA469'],
          series: [
            {
              name: '团队组成',
              type: 'pie',
              radius: ['45%', '80%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '10',
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
                {value: res.data.directNum, name: '直属会员'},
                {value: res.data.teamNum, name: '团队会员'}
              ]
            }
          ]
        };
        this.teamChartInfo = res.data;
      }
    });
    this.capital.getCommissionChartInfo().subscribe(res => {
      let chartList = {
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            let str = '';
            for (let i = 0, l = params.length; i < l; i++) {
              str += (i === 0 ? '' : '<br />') + params[i].seriesName + ' : ' + params[i].value;
            }
            return str;
          },
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['直属会员', '团队会员'],
          textStyle: {
            color: this.textColor
          },
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        textStyle: {
          color: this.textColor
        },
        color: ['#3AA1FF', '#4ECB73'],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: this.textColor
              }
            },
            axisTick: {
              alignWithLabel: true
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            axisTick: {
              show: false
            },
          }
        ],
        series: [
          {
            name: '直属会员',
            type: 'bar',
            barWidth: '20%',
            data: []
          },
          {
            name: '团队会员',
            type: 'bar',
            barWidth: '20%',
            data: []
          },
        ]
      };
      if (res.status === 10000) {
        res.data.forEach(item => {
          chartList.series[0].data.push(item.directCommission);
          chartList.series[1].data.push(item.teamCommission);
          chartList.xAxis[0].data.push(item.settleDate);
        });
        this.brokerageOption = chartList;
      }
    });
  }

  copySuccess(text) {
    if (text) {
      this.message.success('复制成功');
    }
  }

  // 会员百分比
  percentageFun(val) {
    let {directNum, teamNum} = this.teamChartInfo;
    if (!(directNum + teamNum)) {
      return '50%';
    } else {
      return Math.round(val / (directNum + teamNum) * 100) + '%';
    }
  }

  // 提取佣金
  goCommission(type): void {
    /**
     * @description 检测提款密码、银行卡, 用户信息中的cardStatus来判断是否绑定银行卡
     */
    if (!this.user.user.hasWithdrawPassword) {
      // 未设定取款密码
      this.message.info('你还没有设置提款密码，3秒之后将会跳转到设置提款密码页面');
      setTimeout(() => {
        this.router.navigate(['/m/user/userWithdrawal']);
      }, 3000);
    } else if (!this.user.user.hasBankCard) {
      // 未设定银行卡
      this.message.info('你还没有绑定银行卡，3秒之后将会跳转到绑定银行卡页面');
      setTimeout(() => {
        this.router.navigate(['/m/user/userBankCard']);
      }, 3000);
    } else {
      this.router.navigate(['/m/capital/proxy/commissions'], {queryParams: {type}});
    }
  }
}

interface Invited {
  inviteLink: string;
  shareText: string;
}

interface TeamChartInfo {
  directNum: number;
  teamNum: number;
  directAddNum?: number;
  teamAddNum?: number;
  weekDirectAddNum?: number;
  weekTeamAddNum?: number;
}
