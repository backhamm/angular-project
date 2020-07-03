import { Component, OnInit } from '@angular/core';
import {UserService} from "@service/user.service";
import { NzMessageService } from 'ng-zorro-antd';
import {PlatformService} from "@service/platform.service";
import {ResponseBody} from "@src/app/types/common.type";
import {_Reg, Validate} from '@src/app/util/validate';
import {AuthenticationService} from '@service/authentication.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-center-modify-password',
  templateUrl: './center-info-modify-password.component.html',
  styleUrls: ['./center-modify-password.component.less']
})
export class CenterModifyPasswordComponent implements OnInit {
    //设定状态
    public current: number = 0;
    //用户输入的内容
    public params: {password: string, npassword: string, renpassword: string} = {
       password: '',
       npassword: '',
       renpassword: ''
   };
  constructor(
    public user: UserService,
    public message: NzMessageService,
    public platform: PlatformService,
    public validate: Validate,
    public auth: AuthenticationService,
    public activatedRoute: ActivatedRoute,
  ) { 
    let id = this.activatedRoute.snapshot.queryParams.id;
    if (id) {
      this.auth.activeLogin = this.auth.passwordInfo = true
    }
  }

  ngOnInit() {}


    changePwd() {
        const {password, npassword, renpassword} = this.params;
        if (!_Reg.password.reg.test(password) || !_Reg.password.reg.test(npassword)) {
          this.message.error(_Reg.password.message);
          return;
        }
        if (password === npassword) { // 旧密码和新密码相同
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
        this.user.changePassword(this.params).subscribe((res: ResponseBody) => {
            if (res.status === 20004) {
                this.message.success(res.msg);
                this.auth.removeAuthentication();
            } else {
                this.message.error(res.msg);
            }
        });
    }
}
