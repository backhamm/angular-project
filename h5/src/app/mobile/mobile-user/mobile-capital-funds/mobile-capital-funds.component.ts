import {Component, OnInit, NgZone, ElementRef, ViewChild} from '@angular/core';
import {CapitalService} from '@service/capital.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ConfigService} from "@src/app/config/config.service";
import {format} from 'date-fns/esm';
import {ResponseList} from "@src/app/types/common.type";
import {MobileMescrollComponent} from "@src/app/mobile/mobile-common/mobile-mescroll/mobile-mescroll.component";
import {config as configs} from "@src/app/config/config.service";
const {BASE_IMG_MOBILE_URL} = configs.platform;

@Component({
  selector: 'app-mobile-capital-funds',
  templateUrl: './mobile-capital-funds.component.html',
  styleUrls: ['./mobile-capital-funds.component.less']
})
export class MobileCapitalFundsComponent implements OnInit {
  // 下拉刷新对象
  @ViewChild('mescroll', null) mescroll: MobileMescrollComponent;

  //  是否加载中
  public isLoading: boolean = false;


  params: any = {
    pageNo: 1,
    pageSize: 10,
    bdate: '',
    edate: '',
    status: 0,
    type: 0

  };
  public isSelect: boolean = false;

  records: Array<any> = [];

  constructor(
    public capital: CapitalService,
    public message: NzMessageService,
    public zone: NgZone,
    public element: ElementRef,
    public config: ConfigService
  ) {
    this.getData = this.getData.bind(this);
    this.close = this.close.bind(this);
  }

  ngOnInit() {
  }


  /**
   *
   * @param changeTime 改变时间调用
   */
  getData(changeTime?: boolean): any {
    if (changeTime) {
      return this.mescroll.original();
    }
    this.isLoading = true;
    const {bdate, edate} = this.params;
    // 格式化时间
    const params = {...this.params, bdate: format(bdate, 'yyyy-MM-dd'), edate: format(edate, 'yyyy-MM-dd')};
    this.capital.getFundRecord(params).subscribe((res: ResponseList) => {
      // res = {
      //     "total": 30,
      //     "pageSize": 20,
      //     "totalPage": 1,
      //     "pageNo": 1,
      //     "list": [
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-05 16:02:49",
      //             "type": 1,
      //             "typeName": "存款",
      //             "orderNo": "BCK1580890548850",
      //             "amount": 100,
      //             "status": 3,
      //             "statusName": "存款处理中",
      //             "remark": "不申请彩金",
      //             "flow": "IN",
      //             "typeCode": ""
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-05 16:02:11",
      //             "type": 1,
      //             "typeName": "存款",
      //             "orderNo": "BCK1580891770533",
      //             "amount": 100,
      //             "status": 3,
      //             "statusName": "存款处理中",
      //             "remark": "不申请彩金",
      //             "flow": "IN",
      //             "typeCode": ""
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 21:02:46",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "15808235861208797",
      //             "amount": -10,
      //             "status": 3,
      //             "statusName": "转账处理中",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "BG"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 21:02:30",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "15808235699984311",
      //             "amount": -10,
      //             "status": 2,
      //             "statusName": "转账失败",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "BG"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 18:02:55",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "15808111736553148",
      //             "amount": -95,
      //             "status": 3,
      //             "statusName": "转账处理中",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "BG"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 18:02:31",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "VG15808114491766514",
      //             "amount": -10,
      //             "status": 3,
      //             "statusName": "转账处理中",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "VG"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 18:02:09",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "vg15808114272535205",
      //             "amount": -10,
      //             "status": 2,
      //             "statusName": "转账失败",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "vg"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-05 16:02:49",
      //             "type": 1,
      //             "typeName": "存款",
      //             "orderNo": "BCK1580890548850",
      //             "amount": 100,
      //             "status": 3,
      //             "statusName": "存款处理中",
      //             "remark": "不申请彩金",
      //             "flow": "IN",
      //             "typeCode": ""
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-05 16:02:11",
      //             "type": 1,
      //             "typeName": "存款",
      //             "orderNo": "BCK1580891770533",
      //             "amount": 100,
      //             "status": 3,
      //             "statusName": "存款处理中",
      //             "remark": "不申请彩金",
      //             "flow": "IN",
      //             "typeCode": ""
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 21:02:46",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "15808235861208797",
      //             "amount": -10,
      //             "status": 3,
      //             "statusName": "转账处理中",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "BG"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 21:02:30",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "15808235699984311",
      //             "amount": -10,
      //             "status": 2,
      //             "statusName": "转账失败",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "BG"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 18:02:55",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "15808111736553148",
      //             "amount": -95,
      //             "status": 3,
      //             "statusName": "转账处理中",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "BG"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 18:02:31",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "VG15808114491766514",
      //             "amount": -10,
      //             "status": 3,
      //             "statusName": "转账处理中",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "VG"
      //         },
      //         {
      //             "uid": 843187682,
      //             "createTime": "2020-02-04 18:02:09",
      //             "type": 3,
      //             "typeName": "转账",
      //             "orderNo": "vg15808114272535205",
      //             "amount": -10,
      //             "status": 2,
      //             "statusName": "转账失败",
      //             "remark": "游戏转账成功",
      //             "flow": "OUT",
      //             "typeCode": "vg"
      //         }
      //     ]
      // };
      // 展开数据添加属性
      this.records = res.list.map(item => ({...item,  showDetail: false}));
      // 创建下拉刷新
      this.mescroll.createRefresh();
      // 有上拉下拉再处理返回
      this.mescroll.dealResponse(res);
    }, null, () => this.isLoading = false);
  }

  // 过滤图片
  getSrc(item: any): string {
    const { status } = item;
    return `${BASE_IMG_MOBILE_URL}image/user_img/navCheck_0${status}.png`;
  }

  close() {
    this.isSelect = !this.isSelect;
  }

  showDetail(item: any) {
    item.showDetail = !item.showDetail;
  }

}
