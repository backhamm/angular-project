import { Component, OnInit } from '@angular/core';
import {UserService} from "@service/user.service";
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Validate} from "@src/app/util/validate";
import {PlatformService} from "@service/platform.service";
import {CapitalService} from '@service/capital.service';
import {ResponseBody, UserBankCard, WithDraw} from '@src/app/types/common.type';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-capital-withdraw',
  templateUrl: './capital-withdraw.component.html',
  styleUrls: ['./capital-withdraw.component.less']
})
export class CapitalDrawingComponent implements OnInit {

    constructor(
        public user: UserService,
        public message: NzMessageService,
        public capital: CapitalService,
        public validate: Validate,
        public modalService: NzModalService,
        public platformService: PlatformService,
        public router: Router,
        public location: Location
    ) {
      this.user.getUserInfo().subscribe();
    }

    //当前步骤
    currentStep: number = 0;
    // 是否设置提款密码
    openModal: Boolean = false;
    // 银行卡信息
    bankCardInfo: UserBankCard;
    // 参数
    params: WithDraw = {
      amount: null,
      password: null
    };
    // 打码量
    withDrawConfig: any = {};
    // loading
    isLoading: Boolean = false;

    ngOnInit() {
      // 是否显示弹框
      const { hasWithdrawPassword, hasBankCard } = this.user.user;
      this.openModal = !(hasWithdrawPassword && hasBankCard);
      // 如果绑定银行卡，获取银行卡信息，获取打码量信息
      if (hasBankCard) {
        this.getBankCardInfo();
        this.getWithdrawConfig();
      }
    }

      // 跳转设置密码页面
      jumpPage() {
        this.openModal = false;
        const url = this.user.user.hasWithdrawPassword ? '/center/bankcard' : '/center/drawalPassword';
        this.router.navigate([url]);
      }
      // 取消跳转
      cancelJump() {
        this.openModal = false;
        this.location.back();
      }

      // 获取银行卡信息
      getBankCardInfo(): void {
        this.isLoading = true;
        this.user.getBankCardInfo().subscribe(res => {
          if (res.status === 10000) {
            this.bankCardInfo = res.data;
          }
        }, error => { console.log(error); },
          () => { this.isLoading = false; });
      }

      // 获取打码量信息
      getWithdrawConfig(): void {
        this.capital.withddrawConfig().subscribe((res: ResponseBody) => {
          if (res.status === 10000) {
            this.withDrawConfig = res.data;
          }
        });
      }

      /**
       * @description 提交
       */
      validateSub() {
          // 验证
          const { amount, password } = this.params;
          if (!amount) { return this.message.error('请输入提款金额'); }
          if (!this.validate.singleValidateFn('withdrawPassword', password)) { return; }
          // 打码量验证
          this.dealQuantity(() => this.submitFn());
      }

      // 打码量验证
      dealQuantity(res) {
        const { userQuantity, markingQuantity, withdrawFee, withdrawManageFee, withdrawConfig } = this.withDrawConfig;
        if (userQuantity >= markingQuantity && Number(withdrawFee) == 0 && Number(withdrawManageFee) === 0) {
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
            nzOnCancel: () => {}
          });
        }
      }

      /**
       * @description 对话框 => 确认
       */
      submitFn() {
        this.isLoading = true;
        this.capital.doWithDraw(this.params).subscribe((res: ResponseBody) => {
          if (res.status === 10000) {
            this.currentStep = 1;
            // 更新余额
            this.user.getUserInfo().subscribe();
          } else {
            this.message.error(res.msg);
          }
        }, error => {
          this.message.error(error.statusText);
        }, () => {
          this.isLoading = false;
        });
      }

      /**
       * @description 返回
       */
      toPrev() {
          this.currentStep = 0;
          this.params.amount = this.params.password = null;
      }
}
