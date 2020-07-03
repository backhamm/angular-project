import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Validate} from "@src/app/util/validate";
import {UserService} from "@service/user.service";
import {CapitalService} from "@service/capital.service";
import {ResponseBody, WithDraw} from "@src/app/types/common.type";
import {PlatformService} from "@service/platform.service";

@Component({
  selector: 'app-mobile-widthdraw',
  templateUrl: './mobile-widthdraw.component.html',
  styleUrls: ['./mobile-widthdraw.component.less']
})
export class MobileWidthdrawComponent implements OnInit {
  public params: WithDraw = {
    password: '',
    amount: '',
  };
  loading: boolean = false;
  // 打码量
  public withddrawConfig: any = {};

  // 银行卡信息
  bankInfo: any = {};

  constructor(
    public user: UserService,
    public message: NzMessageService,
    public modalService: NzModalService,
    public validate: Validate,
    public capital: CapitalService,
    public platformService: PlatformService,
  ) {
  }

  ngOnInit() {

    // 获取打码量信息
    this.getCardInfo();
  }

  getCardInfo(): void {
    // 如果有绑定卡就获取银行信息获取打码量
    if (this.user.user.hasBankCard) {
      this.getWithdrawConfig();
      this.user.getUserCard().subscribe((res: ResponseBody) => {
        if (res.status === 10000) {
          this.bankInfo = res.data;
        }
      });
      this.getWithdrawConfig();

    }
  }

  getWithdrawConfig(): void {
    this.capital.withddrawConfig().subscribe((res: ResponseBody) => {
      if (res.status === 10000) {
        this.withddrawConfig = res.data;
      }
    });
  }

  /**
   * @description 提交
   */
  regparams(): any {
    return new Promise((res, rej) => {
      const {password, amount} = this.params;

      // 金额限制
      const {maxWithdrawMoney, minWithdrawMoney} = this.withddrawConfig;
      const {singleValidateFn, amount_validate} = this.validate;
      if (!amount_validate(minWithdrawMoney, maxWithdrawMoney, amount) || !singleValidateFn('withdrawPassword', password)) {
        return rej();
      }
      this.dealQuantity(res);

    });

  }

  // 打码量验证
  dealQuantity(res) {
    const {userQuantity, markingQuantity, withdrawFee, withdrawManageFee, withdrawConfig} = this.withddrawConfig;
    if (userQuantity >= markingQuantity && Number(withdrawFee) === 0 && Number(withdrawManageFee) === 0) {
      // 完成直接resove;
      res();
    } else {
      let msg: String;
      if (userQuantity < markingQuantity && Number(withdrawFee) === 0 && Number(withdrawManageFee) === 0) {
        msg = `未完成打码量，提款将收取${withdrawConfig}%的费率,是否继续提款？`;
      } else if (userQuantity < markingQuantity && Number(withdrawFee) > 0 && Number(withdrawManageFee) === 0) {
        msg = `未完成打码量且今日提款次数过多，提款将收取${withdrawConfig}%的费率和${withdrawFee}%的手续费,是否继续提款？`;
      } else if (userQuantity < markingQuantity && Number(withdrawFee) === 0 && Number(withdrawManageFee) > 0) {
        msg = `未完成打码量且今日提款次数过多，提款将收取${withdrawConfig}%的费率和${withdrawManageFee}的行政费,是否继续提款？`;
      } else if (Number(withdrawFee) > 0 && Number(withdrawManageFee) > 0 && userQuantity >= markingQuantity) {
        msg = `今日提款次数过多，提款将收取${withdrawFee}%的手续费和${withdrawManageFee}的行政费,是否继续提款？`;
      } else if (Number(withdrawFee) > 0 && Number(withdrawManageFee) === 0 && userQuantity >= markingQuantity) {
        msg = `今日提款次数过多，提款将收取${withdrawFee}%的手续费,是否继续提款？`;
      } else if (Number(withdrawManageFee) > 0 && Number(withdrawFee) === 0 && userQuantity >= markingQuantity) {
        msg = `今日提款次数过多，提款将收取${withdrawManageFee}的行政费,是否继续提款？`;
      } else if (Number(withdrawFee) > 0 && Number(withdrawManageFee) > 0 && userQuantity < markingQuantity) {
        msg = `未完成打码量，提款将收取${withdrawConfig}%的费率,且今日提款次数过多，提款将收取${withdrawFee}%的手续费和${withdrawManageFee}的行政费,是否继续提款？`;
      }
      this.modalService.confirm({
        nzTitle: '取款提示',
        nzContent: `<p>${msg}</p>`,
        nzOkText: '确定',
        nzOnOk: () => res(),
        nzCancelText: '取消',
        nzOnCancel: () => {
        }
      });
    }
  }

  /**
   * @description 对话框 => 确认
   */
  submitFn(): any {
    this.regparams().then(() => {
      this.loading = true;
      this.capital.doWithDraw(this.params).subscribe(res => {
        if (res.status === 10000) {
          this.message.success(res.msg);
          // 更新
          this.user.getUserInfo().subscribe();
        } else {
          this.message.error(res.msg);
        }
      }, null, () => {
        this.loading = false;
      });
    }, err => err && this.message.error(err));
  }

}
