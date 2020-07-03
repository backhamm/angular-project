import {Component, OnInit} from '@angular/core';
import {CapitalService} from "@service/capital.service";
import {ConfigService} from "@src/app/config/config.service";

@Component({
  selector: 'app-commission-record',
  templateUrl: './extract-record.component.html',
  styleUrls: ['./extract-record.component.less']
})
export class ExtractRecordComponent implements OnInit {

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
  public sortIdentify =  this.btnList[0].type;

  constructor(
    public capital: CapitalService,
    public config: ConfigService,
  ) {
  }

  ngOnInit() {
    this.getExtractRecord();
  }

  // 下拉刷新
  moveEnd(callback) {
    this.pageNo++;
    this.getExtractRecord(callback);
  }

  // 获取提取记录
  getExtractRecord(callback = null) {
    this.capital.getExtractRecord({
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

  // 记录列表左侧状态icon路径
  getImage(status: number) {
    let val = !status ? 3 : status;
    return `${this.config.baseMobileImgUrl}image/wxdl/navCheck_0${val}.png`;
  }

  // 侧边栏取消时触发
  handleCancel() {
    this.startTime = this.endTime = '';
    this.pageNo = 1;
    this.sortIdentify = 0;
    this.showSidebar = false;
    this.getExtractRecord();
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
      this.getExtractRecord();
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
