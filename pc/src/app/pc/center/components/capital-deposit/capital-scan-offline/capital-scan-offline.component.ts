import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {Validate} from "@src/app/util/validate";
import {DepositService} from '@service/deposit.service';
import {ResponseBody} from "@src/app/types/common.type";

@Component({
  selector: 'app-capital-scan-offline',
  templateUrl: './capital-scan-offline.component.html',
  styleUrls: ['./capital-scan-offline.component.less']
})
export class CapitalScanOfflineComponent implements OnInit {

    constructor(
        public deposit: DepositService,
        public message: NzMessageService,
        public validate: Validate
    ) { }
    // 背景icon
    @Input() currentBg;
    // 当前支付商列表
    get payList() {
      return this.deposit.paymentPayer.config;
    }
    // 当前选择索引
    depositType: number = 0;
    // 当前支付信息
    currentPayInfo: any;
    // 金额
    amountValue: any;
    // 订单号
    orderNo: any;

    isLoading: Boolean = false;

    ngOnInit() {
      // 初始化支付信息
      this.currentPayInfo = this.payList[this.depositType];
    }
    /**
     * 切换支付方式
     */
    changeCurrentInfo() {
        this.currentPayInfo = this.payList[this.depositType];
        this.amountValue = this.orderNo = null;
    }

    /**
     * 提交验证
     */
    validateSub() {
      const { minquota, maxquota, id, channel } = this.currentPayInfo;
        if (!this.amountValue) {
            return this.message.error(`存款限额为${minquota}-${maxquota}(元)`);
        }
        if (!this.validate.singleValidateFn('orderCode', this.orderNo)) { return; }
        let params = {
            id: id,
            amount: this.amountValue,
            orderNo: this.orderNo,
            channel: channel
        };
        this.submit(params);
    }

    /**
     * 提交
     * @param params
     */
    submit(params) {
        this.isLoading = true;
        this.deposit.qrCodeOrder(params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.deposit.currentStep = 1;
                this.depositType = 0;
                this.amountValue = this.orderNo = '';
            } else {
                this.message.error(res.msg);
            }
        }, error => {
            this.message.error(error.statusText);
        }, () => {
            this.isLoading = false;
        });
    }

}
