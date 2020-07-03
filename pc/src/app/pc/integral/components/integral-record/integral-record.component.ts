import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@src/app/config/config.service';
import { IntagralService } from '@service/intagral.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService } from '@service/common.service';
import { UserService } from '@service/user.service';
import {ResponseBody, ResponseList} from "@src/app/types/common.type";

@Component({
  selector: 'app-integral-record',
  templateUrl: './integral-record.component.html',
  styleUrls: ['./integral-record.component.less']
})
export class IntegralRecordComponent implements OnInit {

  //获取积分
  integral: any;
  //提佣记录
  integralRecordData: any = [];
  integralRecordPage = {
    page: 1,
    size: 10,
    total: 0,
  };
  integralRecordLoading: boolean = false;
  integralRecordTimes: Date[] = [new Date(), new Date()];
  constructor(
    public config: ConfigService,
    public service: IntagralService,
    public message: NzMessageService,
    public common: CommonService,
    public user: UserService
  ) { }

  ngOnInit() {
    this.getRecordData();
    this.getUserInfors();
  }

  /**
   * @description: 获取用户积分 //获取用户积分
   * @author: zeal
   */
  getUserInfors(): void {
    this.user.getUserInfo().subscribe(res => {
      if (res.status === 10000) {
        const { data } = res;
        this.integral = data.integral;
      } else {
        this.message.error(res.msg);
      }
    });
  }

  /**
   * @description: 时间格式化
   * @param date 时间
   * @param end 是否是结束时间
   * @return: 2017-07-10 00:00:00
   */
  dateFormate(date: Date, end: boolean = false): string {
    let year = date.getFullYear();
    let month = ('00' + (date.getMonth() + 1)).slice(-2);
    let day = ('00' + date.getDate()).slice(-2);
    if (end) {
      return `${year}-${month}-${day}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  }

  /**
   * @description: 获取订单记录
   * @author: zeal
   */
  getRecordData(): void {
    this.integralRecordLoading = true;
    let params = {
      pageSize: this.integralRecordPage.size,
      pageNo: this.integralRecordPage.page,
      bdate: this.dateFormate(this.integralRecordTimes[0]),
      edate: this.dateFormate(this.integralRecordTimes[1], true),
      orderState: 0
    };
    this.service.getIntegralRecod(params).subscribe((res: ResponseList) => {
      this.integralRecordLoading = false;
        const idata = res;
        this.integralRecordData = idata.list;
        this.integralRecordPage.page = idata.pageNo;
        this.integralRecordPage.total = idata.total;
    });
  }

  // 查询订单
    onChange(value: any): void {
      this.integralRecordTimes = value;
      this.getRecordData();
    }

}
