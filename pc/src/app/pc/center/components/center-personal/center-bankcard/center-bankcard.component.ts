import { Component, OnInit } from '@angular/core';
import {UserService} from "@service/user.service";
import { NzMessageService } from 'ng-zorro-antd';
import { Router} from '@angular/router';
import {AddressOptions} from '@src/app/util/addressOptions';
import {PlatformService} from "@service/platform.service";
import {BankInfo, BankTypes, ResponseBody} from '@src/app/types/common.type';
import {Location} from '@angular/common';
import {Validate} from '@src/app/util/validate';

@Component({
  selector: 'app-center-bankcard',
  templateUrl: './center-bankcard.component.html',
  styleUrls: ['./center-bankcard.component.less']
})
export class CenterBankcardComponent implements OnInit {
    //设定状态
    public current: number = 0;
    //银行卡种类
    public BankList: BankTypes[] = [];
    //模态窗状态
    public isDrawal: boolean = false;

    //第一步用户输入信息
    public bankInfo: BankInfo = {
       cardUsername: '',
       bankId: null,
       cardNum: '',
       cardAddress: '',
       password: ''
   };
    //三级联动地址
    public nzOptions: any[] | null = null;
    //银行卡名称
    public bankName: string = '';
    //开户行地址
    public bankAddress: any = [];
    public original: any;
    constructor(
      public user: UserService,
      public location: Location,
      public message: NzMessageService,
      public router: Router,
      public addressOptions: AddressOptions,
      public platform: PlatformService,
      public validate: Validate
    ) { }

    ngOnInit() {
        const { hasWithdrawPassword } = this.user.user;
        // 是否显示弹框
        this.isDrawal = !hasWithdrawPassword;
        // 获取银行卡类型
        hasWithdrawPassword && this.getBankTypes();
          //地址三级联动
        this.nzOptions = this.addressOptions.options;
        this.original = Object.assign({}, this.bankInfo);
    }

    // 跳转设置密码页面
    jumpPage() {
      this.isDrawal = false;
      this.router.navigate(['/center/drawalPassword']);
    }
    // 取消跳转
    cancelJump() {
      this.isDrawal = false;
      this.location.back();
    }

    // 获取银行列表
    getBankTypes() {
        this.user.getBankTypes().subscribe(res => {
          if (res.status === 10000) {
            this.BankList = res.data;
          } else {
            this.message.error(res.msg);
          }
        });
    }

    // 获取银行卡名称
    getBankName() {
      this.bankName = this.BankList.filter((item) => item.bankId === this.bankInfo.bankId)[0].bankName;
    }

    next1() {
        const { cardUsername, cardNum, bankId } = this.bankInfo;
        const regArr = [
            { regName: 'realName', val: cardUsername },
            { regName: 'cardNum', val: cardNum }
          ];
        if (!this.validate.mulValidateFn(regArr)) {
           return;
        }
        if (!bankId) {
          this.message.error('请选择银行！');
          return;
        }
        this.getBankName();
        this.current = 1;
    }

    //绑定银行卡
    next2() {
      const { cardAddress, password } = this.bankInfo;
      if (this.bankAddress.length === 0) {
        this.message.error('请选择开户行所在地！');
        return;
      }
      if (cardAddress === '') {
        this.message.error('请输入正确的开户支行地址！');
        return;
      }
      if (!this.validate.singleValidateFn('withdrawPassword', password)) {
        return;
      }
      const params = {...this.bankInfo, cardAddress: this.bankAddress.join('') + cardAddress};
      this.user.addUserCard(params).subscribe((res: ResponseBody) => {
        if (res.status === 10000) {
            this.user.userInfo.hasBankCard = true;
            this.message.success(res.msg);
            this.current = 2;
            this.user.getUserInfo();
        } else {
            this.message.error(res.msg);
        }
      });
    }
    // 重置
    reset() {
      this.bankInfo = Object.assign({}, this.original);
    }
}
