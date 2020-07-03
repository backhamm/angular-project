import {Component, OnInit} from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";
import {CapitalService} from "@service/capital.service";

@Component({
  selector: 'app-brokerage-record',
  templateUrl: './brokerage-record.component.html',
  styleUrls: ['./brokerage-record.component.less']
})
export class BrokerageRecordComponent implements OnInit {

  public recordList: Array<any> = [];
  public extendBean: ExtendBean;
  public pageSize = 10;
  public pageNo = 1;
  public startTime = '';
  public endTime = '';
  public isLoading = true;
  // 显示侧边栏
  public showSidebar = false;
  // 侧边栏按钮选项
  public btnList = [
    {name: '产佣日期降序', type: 2},
    {name: '产佣日期升序', type: 1},
    {name: '佣金金额降序', type: 4},
    {name: '佣金金额升序', type: 3},
  ];
  // 记录列表排序类型
  public sortIdentify = this.btnList[0].type;

  constructor(
    public capital: CapitalService,
    public config: ConfigService,
  ) {
  }

  ngOnInit() {
    this.getBrokerageRecord();
  }

  // 下拉刷新
  moveEnd(callback) {
    this.pageNo++;
    this.getBrokerageRecord(callback);
  }

  // 获取提取记录
  getBrokerageRecord(callback = null) {
    this.capital.getBrokerageRecord({
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      startTime: this.startTime,
      endTime: this.endTime,
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
        this.extendBean = res.extendBean;
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
    this.sortIdentify = 0;
    this.showSidebar = false;
    this.getBrokerageRecord();
  }

  // 侧边栏确定时触发
  handleOk({startTime, endTime, btnIndex}) {
    if (this.sortIdentify !== btnIndex || this.startTime !== startTime || this.endTime !== endTime) {
      this.recordList = [];
      this.isLoading = true;
      this.startTime = startTime;
      this.endTime = endTime;
      this.pageNo = 1;
      this.sortIdentify = btnIndex;
      this.getBrokerageRecord();
    }
    this.showSidebar = false;
  }
}

interface ExtendBean {
  unSettledCommission: number;
  extractedTimes: number;
  totalExtractedCommissions: number;
  totalBetAmount: number;
  dayCount: number;
  weekCount: number;
  monthCount: number;
}
