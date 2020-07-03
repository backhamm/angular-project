import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {DepositService} from '@service/deposit.service';
@Component({
  selector: 'app-deposit-bank-two-step',
  templateUrl: './deposit-bank-two-step.component.html',
  styleUrls: ['./deposit-bank-two-step.component.less']
})
export class DepositBankTwoStepComponent implements OnInit, OnDestroy {

  constructor(
      public message: NzMessageService,
      public deposit: DepositService
  ) { }

    // 当前支付信息
    get currentPayment() {
      return this.deposit.paymentPayer.config[0];
    }
    // 支付信息
    @Input() depositInfo;

    protected timer: any;

    countDownString: String;

    /**
     * @description: 复制
     * @param value 状态
     */
    copied(value: any): void {
        if (value.isSuccess) {
            this.message.success('复制成功');
        } else {
            this.message.success('复制失败');
        }
    }

    /**
     * @description 下一步 / 取消
     * @param val
     */
    doNext(val: number) {
        this.deposit.currentStep = val;
    }

    /**
     * @description 倒计时
     * @param times
     */
    countDown(times) {
        if (times <= 0) {
            clearTimeout(this.timer);
            return;
        }
        times --;
        this.countDownString = `${Math.floor(times / 60)} 分 ${Math.floor(times % 60)} 秒`;
        this.timer = setTimeout(() => {
               this.countDown(times);
            }, 1000);
        }

    ngOnInit() {
      this.countDown(3600);
    }

    ngOnDestroy() {
        clearTimeout(this.timer);
    }

}
