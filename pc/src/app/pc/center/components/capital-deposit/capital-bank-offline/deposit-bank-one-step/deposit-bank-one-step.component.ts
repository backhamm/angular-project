import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {DepositService} from "@service/deposit.service";
import {NzMessageService} from "ng-zorro-antd";
import {Validate} from "@src/app/util/validate";

@Component({
  selector: 'app-deposit-bank-one-step',
  templateUrl: './deposit-bank-one-step.component.html',
  styleUrls: ['./deposit-bank-one-step.component.less']
})
export class DepositBankOneStepComponent implements OnInit {

  constructor(
      public message: NzMessageService,
      public deposit: DepositService,
      public validate: Validate
  ) { }

    @Output() changeStep_1: EventEmitter<Object> = new EventEmitter<Object>();

    // 当前支付信息
    get currentPayment() {
      return this.deposit.paymentPayer.config[0];
    }

    public params = {
      id: null,
      name: null,
      amount: null,
      channel: 1,
      isCj: 0
    };

    // 是否申请彩金
    handsel: boolean = false;

    isLoading: boolean = false;

    /**
     * @description 验证
     */
    validateSub(): void {
        const {minquota, maxquota, id} = this.currentPayment;
        if (!this.validate.singleValidateFn('realName', this.params.name)) { return; }
        if (!this.params.amount) {
            this.message.error(`单笔限额为${minquota}-${maxquota}(元)`);
            return;
        }
        this.params.id = id;
        this.params.isCj = this.handsel ? 1 : 0;
        this.submit(this.params);
    }

    /**
     * @description 提交
     * @param params
     */
    submit(params): void {
        this.isLoading = true;
        this.deposit.outlineBankPay(params).subscribe(res => {
            if (res.status === 10000) {
                // 向父级(capital-bank-offline)传递数据
                this.changeStep_1.emit({
                    data: res.data
                });
                this.deposit.currentStep = 1;
            } else {
                this.message.error(res.msg);
            }
        }, error => {
            this.message.error(error.statusText);
        }, () => {
            this.isLoading = false;
        });
    }

  ngOnInit() { }
}
