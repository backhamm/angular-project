import {Component, OnInit} from '@angular/core';
import {DepositService} from "@service/deposit.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {Validate} from "@src/app/util/validate";

@Component({
    selector: 'app-mobile-deposit-obank',
    templateUrl: './mobile-deposit-obank.component.html',
    styleUrls: ['./mobile-deposit-obank.component.less']
})
export class MobileDepositObankComponent implements OnInit {

    public bankIndex: any = 0;

    public visible: boolean = false;

    // 是否彩金
    public isCj: boolean = true;

    constructor(public deposit: DepositService,
                public message: NzMessageService,
                public validate: Validate,
                public router: Router) {
    }

    get payList() {
        return this.deposit.paymentPayer.config;
    }

    public params: any = {
        // 1申请， 0不申请
        isCj: 0,
        amount: '',
        channel: '',
        id: '',
    };

    ngOnInit() {
    }

    openToggleDraw(): void {
        this.visible = !this.visible;
    }

    changeSelectedPayment(index) {
        this.bankIndex = index;
        this.openToggleDraw();
    }

    submit() {
        if (Object.keys(this.payList).length > 0) {
            this.regParams().then(() => {
                this.deposit.isSpinning = true;
                this.deposit.outlineBankPay(this.params).subscribe(res => {
                    this.deposit.isSpinning = false;
                    if (res.status === 10000) {
                        this.message.success(res.msg);
                        setTimeout(() => this.router.navigate(['/m/capital/obankOrder'], {queryParams: {...res.data, ...this.payList[this.deposit.payIndex]}}), 300);
                    } else {
                        this.message.error(res.msg);
                    }
                });
            }, null);
        } else {
            return this.message.warning('未获取到银行信息');
        }
    }

    regParams(): Promise<any> {
        return new Promise((res, rej) => {
            const curPay = this.payList[this.deposit.payIndex];
            const {minquota, maxquota, id, channels} = curPay;
            const {amount} = this.params;
            if (!this.validate.amount_validate(minquota, maxquota, amount)) {
                return rej();
            }
            this.params.id = id;
            this.params.channel = channels[this.bankIndex].type;
            this.params.isCj = this.isCj ? 0 : 1;
            // 成功回调
            res();
        });
    }

}
