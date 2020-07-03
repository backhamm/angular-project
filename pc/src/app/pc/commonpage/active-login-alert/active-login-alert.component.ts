import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@src/app/config/config.service';
import { CommonService } from '@service/common.service';
import { UserService } from "@service/user.service";
import { GameService } from "@service/game.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "@service/authentication.service";
import { PlatformService } from "@service/platform.service";
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-active-login-alert',
  templateUrl: './active-login-alert.component.html',
  styleUrls: ['./active-login-alert.component.less']
})
export class ActiveLoginAlertComponent implements OnInit {
  // 发送短信验证码
  public deadline: number = null;
  public msgCode: number

  constructor(
    public config: ConfigService,
    public game: GameService,
    public user: UserService,
    public common: CommonService,
    public router: Router,
    public auth: AuthenticationService,
    public platform: PlatformService,
    public message: NzMessageService,
  ) { }

  ngOnInit() { }

  /**
   * 发送验证码
   */
  sendCode(): void {
    this.auth.getMsgCode({
      mobileNo: this.auth.loginData.username,
      type: 5
    }).subscribe(resp => {
      if (resp.status === 10000) {
        this.countDown()
      }
      this.message.info(resp.msg);
    }, error => console.log(error));
  }

  /**
    *  倒计时
    */
  countDown(): void {
    this.deadline = 1000 * 60;
    let timer = setInterval(() => {
      this.deadline -= 1000;
      if (this.deadline === 0) {
        this.deadline = null;
        window.clearInterval(timer);
      }
    }, 1000);
  }

  // 验证登录
  submitActive():void{
    if(!this.msgCode) {
      this.message.info('验证码不能为空！');
      return;
    }
    this.auth.userActiveLogin({
      username:this.auth.loginData.username,
      msgCode:this.msgCode
    }).subscribe(res => {
      if(res.status === 10000){
         this.auth.activeLogin = this.auth.phoneLogin = this.auth.errorLogin = this.auth.passwordInfo = false;
      }
      this.auth.loginAfter(res,'active');
    })
  }

  //取消
  cancleActive(){
    this.auth.activeLogin = false;
    this.msgCode = null
  }
}
