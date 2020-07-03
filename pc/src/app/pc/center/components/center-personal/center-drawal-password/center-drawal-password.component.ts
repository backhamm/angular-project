import { Component, OnInit } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {UserService} from "@service/user.service";
import {PlatformService} from "@service/platform.service";
import {ResponseBody} from "@src/app/types/common.type";
import {_Reg, Validate} from '@src/app/util/validate';

@Component({
  selector: 'app-center-drawal-password',
  templateUrl: './center-drawal-password.component.html',
  styleUrls: ['./center-drawal-password.component.less']
})
export class CenterDrawalPasswordComponent implements OnInit {
    //设定状态
    public current: number = 0;
    //用户输入的内容
    public params: {password: string, npassword: string, renpassword: string} = {
        password: '',
        npassword: '',
        renpassword: ''
    };
    //加载
    public isLoading: boolean = false;
    constructor(
      public user: UserService,
      public message: NzMessageService,
      public platform: PlatformService,
      public validate: Validate
    ) { }

    ngOnInit() {}

    changePwd() {
      const {password, npassword, renpassword} = this.params;
      const { hasWithdrawPassword } = this.user.user;
      if (hasWithdrawPassword && !_Reg.withdrawPassword.reg.test(password)) { // 有旧密码的情况
        this.message.error(_Reg.withdrawPassword.message);
        return;
      }
      if (!_Reg.withdrawPassword.reg.test(npassword)) { // 新密码
        this.message.error(_Reg.withdrawPassword.message);
        return;
      }
      if (hasWithdrawPassword && password === npassword) { // 旧密码和新密码相同
        this.message.error('旧密码与新密码一致，请重新输入！');
        return;
      }
      if (npassword !== renpassword) { // 确认密码
        this.message.error('确认密码与新密码不一致，请重新输入！');
        return;
      }
      this.next();
    }

    next() {
        this.user.changeQkpwd(this.params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.current = 1;
                this.user.userInfo.hasWithdrawPassword = true;
                this.message.success(res.msg);
            } else {
                this.message.error(res.msg);
            }
        });
    }

}
