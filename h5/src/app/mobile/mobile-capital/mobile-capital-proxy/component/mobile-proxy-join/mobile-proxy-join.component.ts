import {Component, OnInit} from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";

@Component({
  selector: 'app-mobile-proxy-join',
  templateUrl: './mobile-proxy-join.component.html',
  styleUrls: ['./mobile-proxy-join.component.less']
})
export class MobileProxyJoinComponent implements OnInit {

  headerLink = [
    {icon: 'image/wxdl/agentIcon_01.png', name: '邀请记录'},
    {icon: 'image/wxdl/agentIcon_02.png', name: '团队管理'},
    {icon: 'image/wxdl/agentIcon_03.png', name: '佣金流水'},
    {icon: 'image/wxdl/agentIcon_04.png', name: '提佣记录'},
  ];

  textColor = '#fff';

  teamOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      position: ['center']
    },
    color: ['#ca8e24', '#c23531'],
    series: [
      {
        name: '团队组成',
        type: 'pie',
        radius: ['40%', '70%'],
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
          {value: 335, name: '直属会员'},
          {value: 310, name: '团队会员'}
        ]
      }
    ]
  };
  brokerageOption = {
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        let res = '';
        for (let i = 0, l = params.length; i < l; i++) {
          res += (i === 0 ? '' : '<br />') + params[i].seriesName + ' : ' + params[i].value;
        }
        return res;
      },
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['直属会员', '团队会员'],
      textStyle: {
        color: this.textColor
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    textStyle: {
      color: this.textColor
    },
    color: ['#3AA1FF', '#4ECB73'],
    xAxis: [
      {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7'],
        axisLine: {
          lineStyle: {
            color: this.textColor
          }
        },
        axisTick: {
          show: false
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false
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
        data: [99, 155, 300, 134, 290, 230, 320]
      },
      {
        name: '团队会员',
        type: 'bar',
        barWidth: '20%',
        data: [10, 52, 200, 334, 390, 330, 220]
      },
    ]
  };

  constructor(
    private config: ConfigService
  ) {
  }

  ngOnInit() {
  }

}
