import {Component, Input, OnInit } from '@angular/core';
import {DepositService} from '@service/deposit.service';

@Component({
    selector: 'app-capital-bank-offline',
    templateUrl: './capital-bank-offline.component.html',
    styleUrls: ['./capital-bank-offline.component.less']
})
export class CapitalDepositBankComponent implements OnInit {

    constructor(
      public deposit: DepositService
    ) {
    }
    // 背景icon
    @Input() currentBg;

    // 支付信息
    depositInfo: Object = {};

    /**
     * @description 接收子级(deposit-bank-one-step)传送的数据
     * @param obj
     */
    changeOneStep(obj: {data: {}}) {
        this.depositInfo = obj.data;
    }

    ngOnInit() {
    }
}

