import {Component, OnInit} from '@angular/core';
import {CapitalService} from "@service/capital.service";
import {getDate} from "@src/app/util/date";
import {ConfigService} from "@src/app/config/config.service";

@Component({
  selector: 'app-invite-record',
  templateUrl: './invite-record.component.html',
  styleUrls: ['./invite-record.component.less']
})
export class InviteRecordComponent implements OnInit {

  public dateOptions = [
    {name: '全部', day: 1, count: 0},
    {name: '今天', day: 0, count: 0},
    {name: '近一周', day: -6, count: 0},
    {name: '近一月', day: -30, count: 0},
  ];
  public recordList: Array<any> = [];
  public dateIndex = 0;
  public pageSize = 10;
  public pageNo = 1;
  public startTime = '';
  public endTime = '';
  public isLoading = true;

  constructor(
    public capital: CapitalService,
    public config: ConfigService
  ) {
  }

  ngOnInit() {
    this.getInvitedRecord();
  }

  changeTime(index, day) {
    if (this.dateIndex === index) {
      return;
    }
    this.isLoading = true;
    if (day > 0) {
      this.startTime = '';
      this.endTime = '';
    } else {
      this.startTime = getDate(day);
      this.endTime = getDate(0);
    }
    this.dateIndex = index;
    this.recordList = [];
    this.pageNo = 1;
    this.getInvitedRecord();
  }

  moveEnd(callback) {
    this.pageNo++;
    this.getInvitedRecord(callback);
  }

  getInvitedRecord(callback = null) {
    this.capital.getInvitedRecord({
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      startTime: this.startTime,
      endTime: this.endTime
    }).subscribe(res => {
      this.isLoading = false;
      if (res.status === undefined) {
        this.recordList = [...res.list, ...this.recordList];
        let {dayCount, weekCount, monthCount} = res.extendBean;
        let arr = [res.total, dayCount, weekCount, monthCount];
        arr.forEach((item, i) => {
          this.dateOptions[i].count = item;
        });
        callback && callback(!!res.list.length);
        !res.list.length && this.pageNo--;
      } else {
        this.recordList = [];
        this.dateOptions.forEach((item, i, arr) => arr[i].count = 0);
        callback && callback();
      }
    });
  }
}
