import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {DepositService} from "@service/deposit.service";
import {Validate} from "@src/app/util/validate";
import {ConfigService} from "@src/app/config/config.service";

@Component({
    selector: 'app-mobile-deposit-bank',
    templateUrl: './mobile-deposit-bank.component.html',
    styleUrls: ['./mobile-deposit-bank.component.less']
})
export class MobileDepositBankComponent implements OnInit {
    public visible: boolean = false;
    public currentSelectItem: string = '请选择银行列表';
    public bankIndex: any = -1;
    amountIndex;
    public params: any = {
        amount: '',
        payId: '',
        bankcode: null,
        scancode: '',
    };

    constructor(public deposit: DepositService,
                public message: NzMessageService,
                public router: Router,
                public config: ConfigService,
                public validate: Validate) {
    }

    get payList() {
        return this.deposit.paymentPayer.config;
    }

    ngOnInit() {
    }

    dealPayment(i: number) {
        this.deposit.dealPayment(i);
        this.bankIndex = -1;
        this.currentSelectItem = '请选择银行列表';
    }

    // 切换抽屉显示隐藏
    openToggleDraw(): any {
        if (!this.payList[this.deposit.payIndex].banks.length) {
            return this.message.warning('暂无可选择的银行列表');
        }
        this.visible = !this.visible;
    }


    // 当前选中
    changeSelectedBank(item: any, index: number) {

        const {bankCode, bankName} = item;
        this.bankIndex = index;
        this.currentSelectItem = bankName;
        this.params.bankcode = bankCode;
        // 处理抽屉
        this.openToggleDraw();
    }

    submit() {
        this.regParams().then(() => {
            const {amount, payId, bankcode, scancode} = this.params;
            // 线上网银
            const url = `${this.config.requestUrl}pay/online/banking?bankcode=${bankcode}&scancode=${scancode}&amount=${amount}&payId=${payId}&terminal=0`;
            window.open(url);
            /*this.deposit.isSpinning = true;
            this.deposit.onlineBanking(this.params).subscribe((res: any) => {
                this.deposit.isSpinning = false;
                if (res.status !== 10000) {
                    this.message.error(res.msg);
                }
            });*/
        }, null);
    }

    // 输入框限制验证；
    regParams(): Promise<any> {
        return new Promise((res, rej) => {
            const curPay = this.payList[this.deposit.payIndex];
            const {minquota, maxquota, payId, solidStatus, banks, scancode} = curPay;
            // 如果是固额进行赋值操作
            if (!!solidStatus) {
                this.params.amount = curPay.solidAmount[this.amountIndex];
            }
            const {amount, bankcode} = this.params;
            if (!this.validate.amount_validate(minquota, maxquota, amount) ) {
                return rej();
            }
            /*if (!bankcode) {
                return rej('请选择银行');
            }*/
            // 赋值payId
            this.params.payId = payId;
            this.params.scancode = scancode;
            // 成功回调
            res();
        });
    }
}
