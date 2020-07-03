import {Component, Input, OnInit} from '@angular/core';
import {DepositService} from "@service/deposit.service";
import {PlatformService} from "@service/platform.service";
import {CommonService} from "@service/common.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {Validate} from "@src/app/util/validate";

@Component({
  selector: 'app-mobile-deposit-online',
  templateUrl: './mobile-deposit-online.component.html',
  styleUrls: ['./mobile-deposit-online.component.less']
})
export class MobileDepositOnlineComponent implements OnInit {
    @Input() type: any;
    // 当前选中的固额限额选择设置
    public amountIndex: number = 0;
    constructor(public deposit: DepositService,
                public message: NzMessageService,
                public plat: PlatformService,
                public router: Router,
                public validate: Validate,
                public commonService: CommonService) {
    }
    get payList() {
        return this.deposit.paymentPayer.config;
    }
    // 线上支付参数
    public params: any = {
        amount: '',
        scancode: '',
        payId: '',
    };

    ngOnInit() {

    }

    dealPayment(i: number) {
        this.params.amount = '';
        this.amountIndex = 0;
        this.deposit.dealPayment(i);
    }

    submit() {
        this.regParams().then(() => {
            this.deposit.isSpinning = true;
            this.deposit.scanPay(this.params).subscribe(res => {
                this.deposit.isSpinning = false;
                const {data, status, msg} = res;
                if (status === 10000) {
                    let payInfo = data.data, viewType = data.viewType;
                    switch (viewType) {
                        case 'link':
                            window.location.href = payInfo;
                            break;
                        case 'form':
                            if (payInfo !== undefined || payInfo !== "") {
                                data.data = payInfo.replace('<body', '<div').replace(/body>$/, 'div>');
                            }
                            this.router.navigate(['/m/capital/order'], {queryParams: {...data}});
                            break;
                        case 'qrcode':
                            // data.username = data.username.substring(3);
                            this.router.navigate(['/m/capital/order'], {queryParams: {...data}});
                    }
                } else {
                    this.message.error(msg);
                }

            });
        }, null);

    }
    // 输入框限制验证；
    regParams(): Promise<any> {
        return new Promise((res, rej) => {
            const curPay = this.payList[this.deposit.payIndex];
            const {maxquota, minquota, payId, solidStatus, scancode} = curPay;
            // 如果是固额进行赋值操作
            if (!!solidStatus) {
                this.params.amount = curPay.solidAmount[this.amountIndex];
            }
            this.params = {...this.params, payId, scancode};
            const {amount} = this.params;

            if (!this.validate.amount_validate(minquota, maxquota, amount)) {
                return rej();
            }
            res();
        });
    }
}
