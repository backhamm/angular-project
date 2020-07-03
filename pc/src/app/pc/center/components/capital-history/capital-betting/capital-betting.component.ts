import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { CapitalService } from '@service/capital.service';
import {ResponseBody, ResponseList, BetPlatList, SelectPlat} from "@src/app/types/common.type";
import {getDate, getDateTime} from '@src/app/util/date';

@Component({
    selector: 'app-capital-betting',
    templateUrl: './capital-betting.component.html',
    styleUrls: ['./capital-betting.component.less']
})
export class CapitalBettingComponent implements OnInit {
    //选择参数
    public params = {
      pageNo: 1,
      pageSize: 10,
      type: 1,
      gameCode: 'ALL',
      bdate: getDate(0),
      edate: getDate(0)
    };

    // 当前选中的平台
    currentSelectPlat: SelectPlat = {
        type: 0,
        gameName: '请先选择需要查看的游戏平台',
        gameCode: 'ALL'
    };
    //游戏平台选择框
    showPlatform: boolean = false;
    //查询时间
    rangeTime: Date[] = [new Date(), new Date()];

    //快捷选时
    quickTime: any;
    quickArr: { label: string, value: number }[] = [
        { label: '今天', value: 0 },
        { label: '昨天', value: 1 },
        { label: '最近三天', value: 2 },
        { label: '最近一周', value: 6 },
        { label: '最近一月', value: 4 },
    ];

    //表格数据
    tableData: ResponseList = null;
    //所有游戏平台
    platformList: BetPlatList[];
    //请求数据loading
    loading: boolean = false;

    constructor(
        public capital: CapitalService,
        public message: NzMessageService,

    ) { }

    ngOnInit() {
        //设置平台选择列表
        this.getPlatform();
    }

    /**
     * @description: 获取游戏平台
     * @author: table
     */
    getPlatform(): void {
        this.capital.getBetConfig().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
              this.platformList = res.data;
              // 初始化信息
              this.currentSelectPlat.type = res.data[0].type;
            } else {
              this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 平台点击事件
     * @author: table
     */
    platformClick(currentItem, currentList): void {
      const { type, desc } = currentItem;
      const { gameName, gameCode } = currentList;
      this.currentSelectPlat = {
        type,
        gameCode,
        gameName: gameCode === 'ALL' ? desc : gameName
      };
      this.params.type = type;
      this.params.gameCode = gameCode;
      this.params.pageNo = 1;
      // 关闭弹框
      this.showPlatform = false;
      // 发送请求
      this.getData();
    }

    /**
     * @description: 请求数据
     * @author: table
     */
    getData() {
        this.loading = true;
        this.capital.getBetRecord(this.params).subscribe((res: ResponseList) => {
            if (res) {
              this.tableData = res;
            }
          }, error => { console.log(error); },
          () => { this.loading = false; });
    }
    /**
     * @description: 时间改变
     */
    rangeChange() {
        this.params.pageNo = 1;
        this.params.bdate = getDateTime(this.rangeTime[0]);
        this.params.edate = getDateTime(this.rangeTime[1]);
        // 当已选平台不为空的情况 => 发送接口
        this.currentSelectPlat.gameName !== '请先选择平台' && this.getData();
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
     * @description: 页码改变
     */
    changePageIndex(index): void {
      this.params.pageNo = index;
      this.getData();
    }
}

