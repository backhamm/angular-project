import {Component, OnInit} from '@angular/core';
import {DepositService} from "@service/deposit.service";
import {NzMessageService} from "ng-zorro-antd";
import {Location} from "@angular/common";

@Component({
    selector: 'app-mobile-deposit',
    templateUrl: './mobile-deposit.component.html',
    styleUrls: ['./mobile-deposit.component.less']
})
export class MobileDepositComponent implements OnInit {
    // 1-网银 2-线上扫码 3-线下扫码 4-银行汇款
    type: number = 0;
    selectIndex: number = -1;
    // 支付渠道
    payChannel: Array<any> = [];
    // loading
    isSpinning: boolean = false;
    constructor(public deposit: DepositService,
                public location: Location,
                public message: NzMessageService) {
    }

    ngOnInit() {
        this.getPaymentChannelList();
    }


    getPaymentChannelList() {
        this.deposit.isSpinning = true;
        this.deposit.getPayConfig().subscribe(res => {
            const {status, data, msg} = res;
            if (status === 10000) {
                // 渠道
                this.payChannel = data;
                this.changeChannel(data[0], 0);
            } else {
                this.message.error(msg);
                this.location.back();
            }
        }, null, () => this.deposit.isSpinning = false);
    }
    changeChannel(item: any, i: number) {
        // 当前点击同一个支付渠道
        if (this.selectIndex === i) {
            return;
        }
        // 触发动画
        this.type = 0;
        this.deposit.paymentPayer = item;

        // 选中状态
        this.selectIndex = i;

        // 初始化的支付商
        this.deposit.dealPayment(0);

        // 设置当前type与支付渠道的支付商, 延迟更新dom更新进行动画
        setTimeout(() => this.type = item.type, 0);
    }
}
