import { Component, OnInit } from '@angular/core';
import {CapitalService} from "@service/capital.service";
import {ConfigService} from "@src/app/config/config.service";

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.less']
})
export class TeamManagementComponent implements OnInit {
  public typeList = [
    {name: '全部'},
    {name: '直属'},
    {name: '团队'}
  ];
  public recordList: Array<any> = [];
  public teamIdentify = 0;
  public pageSize = 10;
  public pageNo = 1;
  public startTime = '';
  public endTime = '';
  public isLoading = true;

  // 显示侧边栏
  public showSidebar = false;
  // 侧边栏按钮选项
  public btnList = [
    {name: '注册时间降序', type: 2},
    {name: '注册时间升序', type: 1},
    {name: '累计业绩降序', type: 4},
    {name: '累计业绩升序', type: 3},
    {name: '旗下会员降序', type: 6},
    {name: '旗下会员升序', type: 5},
  ];
  // 记录列表排序类型
  public sortIdentify =  this.btnList[0].type;

  constructor(
    public capital: CapitalService,
    public config: ConfigService
  ) {
  }

  ngOnInit() {
    if (!this.capital.proxyInfo) {
      this.capital.getProxyInfo();
    }
    this.getTeamManagement();
  }

  changeType(index) {
    if (this.teamIdentify === index) {
      return;
    }
    this.isLoading = true;
    this.teamIdentify = index;
    this.recordList = [];
    this.pageNo = 1;
    this.getTeamManagement();
  }

  moveEnd(callback) {
    this.pageNo++;
    this.getTeamManagement(callback);
  }

  getTeamManagement(callback = null) {
    this.capital.getTeamManagement({
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      startTime: this.startTime,
      endTime: this.endTime,
      teamIdentify: this.teamIdentify,
      sortIdentify: this.sortIdentify
    }).subscribe(res => {
      this.isLoading = false;
      if (res.status === undefined) {
        if (callback) {
          callback(!!res.list.length);
          !res.list.length && this.pageNo--;
          this.recordList = [...res.list, ...this.recordList];
        } else {
          this.recordList = res.list;
        }
      } else {
        this.recordList = [];
        callback && callback();
      }
    });
  }

  // 侧边栏取消时触发
  handleCancel() {
    this.startTime = this.endTime = '';
    this.pageNo = 1;
    this.teamIdentify = 0;
    this.sortIdentify = 0;
    this.showSidebar = false;
    this.getTeamManagement();
  }

  // 侧边栏确定时触发
  handleOk({startTime, endTime, btnIndex, typeIndex}) {
    if (this.sortIdentify !== btnIndex || this.startTime !== startTime || this.endTime !== endTime || this.teamIdentify !== typeIndex) {
      this.recordList = [];
      this.isLoading = true;
      this.startTime = startTime;
      this.endTime = endTime;
      this.pageNo = 1;
      this.teamIdentify = typeIndex;
      this.sortIdentify = btnIndex;
      this.getTeamManagement();
    }
    this.showSidebar = false;
  }

  // 获取图片路径
  getImage(agencyLevel: string | string) {
    let isTeam = agencyLevel === '团队';
    return `${this.config.baseMobileImgUrl}image/wxdl/agentIcon_${isTeam ? 'td' : 'zs'}.png`;
  }

  // 按需传递对应的参数
  getParams({agencyLevel, topUsername, totalBetAmount, directNum, todayBetAmount, username, agencyUid}) {
    if (agencyLevel === '团队') {
      return {
        isTeam: 1,
        username,
        topUsername,
        totalBetAmount,
        agencyUid
      };
    } else {
      return {
        username,
        directNum,
        todayBetAmount,
        totalBetAmount,
        agencyUid
      };
    }
  }
}
