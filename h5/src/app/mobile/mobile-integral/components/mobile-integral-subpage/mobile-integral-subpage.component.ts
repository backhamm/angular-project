import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "@src/app/config/config.service";
import {AddressOptions} from '@src/app/util/addressOptions';
import {UserService} from "@service/user.service";
import {IntagralService} from "@service/intagral.service";
import {NzMessageService} from "ng-zorro-antd";
import {DatePipe} from "@angular/common";
import {_Reg} from "@src/app/util/validate";
import {config as configs} from "@src/app/config/config.service";
const {BASE_IMG_MOBILE_URL} = configs.platform;

@Component({
  selector: 'app-mobile-integral-record',
  templateUrl: './mobile-integral-subpage.component.html',
  styleUrls: ['./mobile-integral-subpage.component.less'],
  providers: [DatePipe]
})
export class MobileIntegralSubpageComponent implements OnInit {
  // 订单记录开始和结束时间
  startValue: Date = new Date();
  endValue: Date = new Date();
  // 订单记录列表
  recordList = [];
  header = ['订单记录', '兑换规则', '订单详情'];
  // 子页面类型(0 = 订单记录，1 = 兑换规则，2 = 订单详情)
  pageType: any;
  // 手风琴当前打开的下标
  openIndex = -1;
  // 商品兑换信息
  urlParams = [];
  // 商品兑换数量
  count = 1;
  // 省份下标
  province = 0;
  // 城市及下标
  city = 0;
  // 行政区下标
  district = null;
  // 详细地址
  detailedAddress = '';
  // 收货人姓名
  username = '';
  // 收货人手机
  phone = '';
  // 备注信息
  remark = '';
  // 数据请求中
  isRequest = false;


  constructor(
    public route: ActivatedRoute,
    public config: ConfigService,
    public addressOptions: AddressOptions,
    public user: UserService,
    public integral: IntagralService,
    public message: NzMessageService,
    public router: Router,
    public datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.pageType = Number(this.route.snapshot.paramMap.get('id'));
    this.pageType === 2 && this.route.queryParams.subscribe(res => {
        this.urlParams = res['info'].split('_');
      }
    );
    document.getElementsByTagName('html')[0].scrollTop = 0;
    // 订单记录
    if (this.pageType === 0) {
      this.query();
    }

  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

  // 查询订单记录
  query() {
    if (!this.startValue || !this.endValue) {
      return this.message.warning('请填写正确的起止时间！');
    }
    if (!this.isRequest) {
      this.isRequest = true;
      const params = {
        terminal: '1',
        pageSize: 1000,
        pageNo: 1,
        orderState: 0,
        bdate: this.datePipe.transform(this.startValue, 'yyyy-MM-dd'),
        edate: this.datePipe.transform(this.endValue, 'yyyy-MM-dd'),
      };
      this.integral.getIntegralRecod(params).subscribe(res => {
        this.isRequest = false;
        this.recordList = res.list;
      });
    }
  }

  // 提交积分兑换订单
  confirm() {
    if (!this.isRequest) {
      this.isRequest = true;
      const address = this.addressOptions.options[this.province];
      const province = address.value;
      const city = address.children[this.city].value;
      const district = address.children[this.city].children[this.district];
      let params = {
        id: this.urlParams[0],
        num: this.count,
        deliverAddress: province + city + district + this.detailedAddress,
        deliverName: this.username,
        deliverPhone: Number(this.phone),
        deliverRmk: this.remark,
        terminal: '1',
      };
      if (this.checkParams()) {
        this.integral.exchangeGood(params).subscribe(res => {
          this.isRequest = false;
          const {status, msg} = res;
          if (status === 10000) {
            this.user.getUserInfo().subscribe(() => {
              this.message.success(msg);
              this.router.navigate(['/m/integral']);
            });

          } else {
            this.message.error(msg);
          }
        });
      } else {
        this.isRequest = false;
      }
    }
  }

  // 过滤图片
  getSrc(item: any): string {
    const { orderState } = item;
    return `${BASE_IMG_MOBILE_URL}image/user_img/navCheck_${orderState +1}.png`;
  }

  checkParams() {
    if (this.count < 1) {
      this.message.error('请填写正确的兑换数量！');
    } else if (!this.detailedAddress.length) {
      this.message.error('配送详细地址不能为空！');
    } else if (!_Reg.realName.reg.test(this.username)) {
      this.message.error(_Reg.realName.message);
    } else if (!_Reg.mobile.reg.test(this.phone)) {
      this.message.error(_Reg.mobile.message);
    } else if (this.urlParams[3] * this.count > this.user.userInfo.integral) {
      this.message.error('积分不足，无法兑换！');
    } else {
      return true;
    }
  }
}
