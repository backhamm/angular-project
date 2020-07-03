import { Component, OnInit } from '@angular/core';
import { CapitalService } from '@service/capital.service';
import { NzMessageService } from 'ng-zorro-antd';
import {ResponseBody, ResponseList} from "@src/app/types/common.type";
import {getDate, getDateTime} from '@src/app/util/date';

@Component({
    selector: 'app-capital-funds',
    templateUrl: './capital-funds.component.html',
    styleUrls: ['./capital-funds.component.less']
})
export class CapitalFundsComponent implements OnInit {
    //请求数据loading
    loading: boolean = false;
    // 配置数据
    configData = [];
    //选择参数
    public params = {
      pageNo: 1,
      pageSize: 10,
      status: 0,  //  0-全部 1 成功 2-失败 3-处理中
      type: 0, // 0-全部 1-存款 2-提款 3-转账 4-加款 5-扣款 6-彩金 7-优惠 8-返水 9-活动
      bdate: getDate(0),
      edate: getDate(0)
    };
    //表格数据
    tableData: ResponseList = null;
    //查询时间
    rangeTime: Date[] = [new Date(), new Date()];
    //快捷选时
    quickTime = 0;
    quickArr: { label: string, value: number }[] = [
        { label: '今天', value: 0 },
        { label: '昨天', value: 1 },
        { label: '最近三天', value: 2 },
        { label: '最近一周', value: 6 },
        { label: '最近一月', value: 4 },
    ];

    constructor(
        public capital: CapitalService,
        public message: NzMessageService,
    ) { }

    ngOnInit() {
        // 获取配置信息
        this.getConfigData();
        // 获取默认数据
        this.getData();
    }

    /**
     * 获取配置筛选信息
     */
    getConfigData() {
        this.capital.getHistoryConfig().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.configData = res.data;
            }
        });
      }

    /**
     * @description: 获取数据
     * @author: table
     */
    getData() {
        this.loading = true;
        this.capital.getFundRecord(this.params).subscribe((res: ResponseList) => {
            if (res) {
                this.tableData = res;
            }
        }, error => { console.log(error); },
          () => { this.loading = false; });
    }


    /**
     * @description: 时间区间改变
     */
    rangeChange() {
      this.params.pageNo = 1;
      this.params.bdate = getDateTime(this.rangeTime[0]);
      this.params.edate = getDateTime(this.rangeTime[1]);
      this.getData();
    }

    /**
     * @description: 快捷选时 => 联动区间时间，改变区间时间并请求接口
     */
    quickChange(): void {
      let start: Date;
      let end = new Date();
      const value = this.quickTime;
      if (value === 0) { // 今天
        start = new Date();
      } else if (value === 4) { // 本月
        const year = end.getFullYear();
        const month = end.getMonth();
        const maxDay = new Date(year, month, 0).getDate() - 1;
        start = new Date(end.getTime() - maxDay * 24 * 3600 * 1000);
      } else { // 昨天、最近三天、本周
        start = new Date(end.getTime() - value * 24 * 3600 * 1000);
      }
      this.rangeTime = [start, end];
      this.rangeChange();
    }

    /**
     * @description: 状态改变
     */
    statusChange(): void {
      // status改变时，默认将type = 0；
      this.params.pageNo = 1;
      this.params.type = 0;
      this.getData();
    }

    /**
     * @description: 类型改变
     */
    typeChange(): void {
      this.params.pageNo = 1;
      this.getData();
    }

    /**
     * @description: 页码改变
     */
    changePageIndex(index): void {
      this.params.pageNo = index;
      this.getData();
    }

    /**
     * @description: 重置筛选
     * @author: table
     */
    reset(): void {
        this.rangeTime = [];
        this.quickTime = undefined;
        const init = {
          status : 1,
          type: 0,
          bdate: getDate(0),
          edate: getDate(0)
        };
        this.params = Object.assign({}, this.params, init);
    }
}
