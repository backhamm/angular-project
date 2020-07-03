import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NzMessageService } from "ng-zorro-antd";
import { ConfigService } from "@src/app/config/config.service";
import { DepositService } from '@service/deposit.service';

@Component({
  selector: 'app-capital-online-pay',
  templateUrl: './capital-online-pay.component.html',
  styleUrls: ['./capital-online-pay.component.less']
})
export class CapitalOnlinePayComponent implements OnInit, OnChanges {

  constructor(
    public message: NzMessageService,
    public config: ConfigService,
    public deposit: DepositService
  ) {
  }

  // 背景icon
  @Input() currentBg;

  // 当前支付商列表
  get payList() {
    return this.deposit.paymentPayer.config;
  }
  // 当前支付商信息
  get currentPayment() {
    const { paymentPayer, payIndex } = this.deposit;
    return paymentPayer.config[payIndex] || {};
  }
  // 是否加载中
  isLoading: boolean = false;
  // 支付金额
  amountValue: number;
  // 当前银行索引
  bankSelected: number = 0;
  // 支付抽屉 关闭状态
  drawerVisible: boolean = false;
  // 扫码支付返回结果
  scanPayment: any;

  ngOnInit() {
    // 初始化金额
    this.initAmount();
  }

  /**
   *  切换支付商
   */
  switchPayment(index: number): void {
    // 支付商选择
    this.deposit.payIndex = index;
    // 切换支付商时，重置银行选择
    this.bankSelected = 0;
    // 初始化金额
    this.initAmount();
  }

  /**
   * 如果有固额 => 初始化金额
   * 无 => 重置为 null
   */
  initAmount() {
    if (!!this.currentPayment.solidStatus) {
      this.amountValue = this.currentPayment.solidAmount[0];
    } else {
      this.amountValue = null;
    }
  }

  /**
   * 银行选择切换
   * @param {number} index
   */
  bankSwitch(index: number): void {
    this.bankSelected = index;
  }

  /**
   *  存款提交
   */
  submit(): void {
    const { minquota, maxquota, scancode, payId } = this.currentPayment;
    if (!this.amountValue) {
      this.message.error(`单笔限额为${minquota}-${maxquota}(元)`);
      return;
    }
    let params = {
      scancode: scancode,
      payId: payId,
      amount: this.amountValue
    };
    // 网银需要多传一个 bankcode
    if (scancode === 'wy') {
      const { banks } = this.currentPayment;
      params = Object.assign({}, params, {
        bankcode: banks.length > 0 ? banks[this.bankSelected].bankCode : null
      });
    }
    this.onlinePaySubmit(params);
  }
  /**
   * 线上支付
   * @param params
   */
  onlinePaySubmit(params) {
    this.isLoading = true;
    this.deposit.onlinePay(params).subscribe(
      resp => {
        const { status, data, msg } = resp;
        if (status === 10000) {
          this.scanPayment = data;
          if (data.viewType === 'link') {
            window.open(data.data)
            return
          }
          if(data.viewType === 'form'){
            this.formTypeSub(data.data)
             return
           }
          this.toggleDrawer();
        } else {
          this.message.warning(msg);
        }
      }, error => {
        this.message.error(error.statusText);
      }, () => {
        this.isLoading = false;
      }
    );
  }
  //form表单的提交方式
  formTypeSub(data) {
    let OnlineWindow = window.open('');
    let template = ''
      + '<body style="background:#fff;">'
      + '<p style="text-align: center;margin-top: 100px;font-size: small;">'
      + '正在生成二维码,请勿重复点击.....' + '</p>'
      + '<div style="visibility: hidden;" id="forms">'
      + '</div>'
      + '</body>';

    OnlineWindow.document.write(template);

    let html = data;
    html = html.replace('<body', '<div');
    html = html.replace(/body>$/, 'div>');
    OnlineWindow.document.getElementById('forms').innerHTML = html;
    // @ts-ignore 忽略TS检查
    OnlineWindow.document.getElementById('actform').submit();

  }


  toggleDrawer() {
    this.drawerVisible = !this.drawerVisible;
  }

  // 输入属性发生变化时
  ngOnChanges(changes: SimpleChanges): void {
    try {
      this.initAmount();
    } catch (e) { }
  }
}
