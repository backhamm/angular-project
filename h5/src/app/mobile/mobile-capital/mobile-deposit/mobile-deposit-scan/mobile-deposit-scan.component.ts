import {Component, OnInit} from '@angular/core';
import {DepositService} from "@service/deposit.service";
import {NzMessageService} from "ng-zorro-antd";
import {PlatformService} from "@service/platform.service";
import {Validate} from "@src/app/util/validate";

@Component({
    selector: 'app-mobile-deposit-scan',
    templateUrl: './mobile-deposit-scan.component.html',
    styleUrls: ['./mobile-deposit-scan.component.less']
})
export class MobileDepositScanComponent implements OnInit {

    public params: any = {
        id: '',
        amount: '',
        orderNo: '',
        channel: ''
    };

    constructor(public deposit: DepositService,
                public message: NzMessageService,
                public validate: Validate,
                public plat: PlatformService) {
    }
    get payList() {
        return this.deposit.paymentPayer.config;
    }
    ngOnInit() {
    }
    // 扫码单独处理数据返回不一样
    dealPayment(i: number): void {
        this.deposit.dealPayment(i);
        this.resetParams();
    }

    submit(): void {
        this.regParams().then(() => {
            this.deposit.isSpinning = true;
            this.deposit.qrCodeOrder(this.params).subscribe(res => {
                this.deposit.isSpinning = false;
                if (res.status === 10000) {
                    this.message.success(res.msg);
                    // 重置参数
                    this.resetParams();
                } else {
                    this.message.error(res.msg);
                }
            });
        }, null);

    }

    regParams(): Promise<any> {
        return new Promise((res, rej) => {
            const curPay = this.payList[this.deposit.payIndex];
            // 获取参数值
            const {minquota, maxquota, id, channel} = curPay;
            const {amount_validate, singleValidateFn} = this.validate;
            // 设定当前支付商的id与channel;
            this.params = {...this.params, id, channel};
            const {amount, orderNo} = this.params;
            if (!amount_validate(minquota, maxquota, amount) || !singleValidateFn('orderCode', orderNo)) {
                return rej();
            }
            // 成功回调
            res();
        });

    }

    resetParams() {
        // 重置参数
        this.params.orderNo = '';
        this.params.amount = '';
    }

}
