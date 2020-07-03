import {Component, OnInit} from '@angular/core';
import {CapitalService} from "@service/capital.service";
import {DepositService} from '@service/deposit.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Location} from '@angular/common';

@Component({
    selector: 'app-capital-deposit',
    templateUrl: './capital-deposit-index.component.html',
    styleUrls: ['./capital-deposit-index.component.less']
})
export class CapitalDepositIndexComponent implements OnInit {

    // loading
    isSpinning: boolean = false;

    // 支付渠道
    payChannel: Array<any> = [];

    // 1-网银 2-线上扫码 3-线下扫码 4-银行汇款
    type: number = 0;

    // 当前渠道索引值
    selectedIndex: number = 0;

    constructor(
      public capital: CapitalService,
      public deposit: DepositService,
      public location: Location,
      public message: NzMessageService
    ) { }

    /**
     * 获取支付渠道
     */
    getPaymentChannelList() {
      this.isSpinning = true;
      this.deposit.getPayConfig().subscribe(res => {
        const {status, data, msg} = res;
        if (status === 10000) {
          this.payChannel = data;
          // 初始化显示渠道
          this.changeChannel();
        } else {
          this.message.error(msg);
          this.location.back();
        }
      }, null, () => this.isSpinning = false);
    }

    /**
     * 切换渠道
     */
    changeChannel() {
          const currentPay = this.payChannel[this.selectedIndex];
          this.type = currentPay.type;
          this.deposit.paymentPayer = currentPay;
          // 支付商索引清零
          this.deposit.payIndex = 0;
      }

    /**
     * 切换支付渠道是重置支付步骤
     * 解决 => 当支付完成后，点击当前路由，无法返回的问题
     */
    resetCurrentStep() {
      this.deposit.currentStep = 0;
    }

    ngOnInit() {
        // 获取支付渠道信息
        this.getPaymentChannelList();
    }
}
