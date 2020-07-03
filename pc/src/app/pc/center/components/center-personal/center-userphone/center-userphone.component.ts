import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from "@service/user.service";
import { NzMessageService } from 'ng-zorro-antd';
import {PlatformService} from "@service/platform.service";
import {Validate} from '@src/app/util/validate';
import {ResponseBody} from "@src/app/types/common.type";
import {AuthenticationService} from '@service/authentication.service';
@Component({
  selector: 'app-center-userphone',
  templateUrl: './center-userphone.component.html',
  styleUrls: ['./center-userphone.component.less']
})
export class CenterUserphoneComponent implements OnInit, OnDestroy {
    //设定状态
    public current: number = 0;
    //手机验证码倒计时状态
   public isGetting: boolean = false;
   public timeCount: number = 60;
   private timer;
   //用户输入信息
    public params: {password: any, mobileNo: any, msgCode: any} = {
        password: '',
        mobileNo: '',
        msgCode: ''
    };
  constructor(
    public user: UserService,
    public message: NzMessageService,
    public platform: PlatformService,
    public validate: Validate,
    public auth: AuthenticationService
  ) { }

    ngOnInit() {}

    ngOnDestroy () {
      clearInterval(this.timer);
    }

    /**
     * 获取手机验证码
     */
    getPhoneCode () {
        // 验证
        if (!this.validate.singleValidateFn('mobile', this.params.mobileNo)) {
          return;
        }
        this.auth.getMsgCode({
          type: 4,
          mobileNo: this.params.mobileNo
        }).subscribe((res: ResponseBody) => {
          if (res.status === 10000) {
            this.message.success('验证码发送成功');
            this.countDown();
          } else {
            this.message.error(res.msg);
          }
        });
    }

    /**
     * 倒计时
     */
    countDown () {
          this.isGetting = true;
          this.timer = setInterval( () => {
              this.timeCount--;
              if (this.timeCount === 0) {
                  this.isGetting = false;
                  clearInterval(this.timer);
              }
          }, 1000);
      }

    next() {
        // 验证
        const {  password, mobileNo, msgCode} = this.params;
        const regArr = [
          { regName: 'password', val: password },
          { regName: 'mobile', val: mobileNo },
          { regName: 'code', val: msgCode }
        ];
        if (!this.validate.mulValidateFn(regArr)) {
          return;
        }
        this.user.changeUserPhone(this.params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.current = 1;
                // Object.assign({}, this.user.userInfo, {hasMobile: true});
                this.user.userInfo.hasMobile = true;
                this.message.success(res.msg);
                this.user.getUserInfo();
            } else {
                this.message.error(res.msg);
            }
        });
    }

}
