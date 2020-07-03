import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonService } from "@service/common.service";
import { AuthenticationService } from "@src/app/service/authentication.service";
import { ConfigService } from "@src/app/config/config.service";
import { NzMessageService } from "ng-zorro-antd";
import { _Reg } from "@src/app/util/validate";
import { PlatformService } from "@service/platform.service";
import { ResponseBody } from "@src/app/types/common.type";
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.less']
})
export class MobileLoginComponent implements OnInit {
  messages: string;
  public loginValidateForm: FormGroup;
  public phoneValidateForm: FormGroup;
  public revivingValidateForm: FormGroup;
  public msgCode:string='';
  public _Reg: any = _Reg;
  loading = false;
  // 滑块人机验证
  sliderVerify: boolean = false;
  eyes: boolean = true;
  public deadline: any;
  public revivingDeadline: any;
  isLoading = false;
  /**
   * 是否账号登录
   */
  isQuick: boolean = true;

  // 手机登录
  phoneLoading: boolean = false;
  //记住密码按钮
  checkedRemember: boolean = true;

  public username2: any = '';
  public password2: any = '';

  constructor(
    public config: ConfigService, public fb: FormBuilder,
    public auth: AuthenticationService, public message: NzMessageService,
    public router: Router, public commonService: CommonService,
    public platformService: PlatformService,
  ) {
    //获取cookie  设置账号密码
    if (this.getCookie('user') && this.getCookie('pass')) {
        this.username2 = this.getCookie('user')
        this.password2 = this.getCookie('pass')
        
    }

  }

  ngOnInit() {
    this.loginValidateForm = this.fb.group({
      username: [this.username2,
      [Validators.required, Validators.pattern('')]
      ],
      password: [this.password2,
      [Validators.required, Validators.pattern('')]
      ],
    });
    this.phoneValidateForm = this.fb.group({
      mobileNo: ['',
        [Validators.required, Validators.pattern(_Reg.mobileLogin.reg)]
      ],
      msgCode: ['',
        [Validators.required, Validators.pattern(_Reg.codeLogin.reg)]
      ],
    });
    this.revivingValidateForm = this.fb.group({
      mobileNo: ['',
        [Validators.required, Validators.pattern(_Reg.mobileLogin.reg)]
      ],
      msgCode: ['',
        [Validators.required, Validators.pattern(_Reg.codeLogin.reg)]
      ],
    });
  }

  get username() {
    return this.loginValidateForm.get('username');
  }

  get password() {
    return this.loginValidateForm.get('password');
  }

  // 手机登录
  get mobileNo() {
    return this.phoneValidateForm.get('mobileNo');
  }

  get pMobileNo() {
    return this.phoneValidateForm.get('mobileNo');
  }
  // 激活登录
  get revivingNo() {
    return this.revivingValidateForm.get('mobileNo');
  }

  get revivingCode() {
    return this.revivingValidateForm.get('msgCode');
  }
  // 轮播
  get carouselList() {
    const list = this.platformService.webComConfig.filter(item => !item || Number(item.type) === 1);
    return (list.length ? list[0].configs : []);

  }

  //tab 切换
  isQuickRegistration(e): void {
    let $id = e.target.id;
    this.isQuick = $id === 'tab-0';
  }

  loginSubmit(): void {
    // 重复点击处理
    if (this.loading) {
      return;

    }
    this.loading = true;
    const { value, valid } = this.loginValidateForm;

    if (valid) {
      this.auth.login(value).subscribe(resp => {
        // 记住密码
        if (this.checkedRemember && resp.status === 10000) {
          //Base64加密账号 密码
          value.password = Base64.encode(value.password);
          value.username = Base64.encode(value.username);
          //设置cookie值  有效期是7天
          this.setCookie('user', value.username, 7)
          this.setCookie('pass', value.password, 7)
        } else {
          this.username2 = '';
          this.password2 = '';
          //不记住密码就清除cookie
          this.removeCookie('user')
          this.removeCookie('pass')
        }

      }, error => {
        this.message.error(error.toString());
      }, () => {
        this.loading = false;
      });
    }
  }

  /**
   *  手机登录
   */
  loginPhoneSubmit(): void {
    this.phoneLoading = true;
    if (this.phoneValidateForm.valid) {
      this.auth.phoneLogin(this.phoneValidateForm.value)
        .subscribe(res => {
        }, error => {
          this.message.error(error.statusText);
        }, () => {
          this.phoneLoading = false;
        });
    }
  }
  //清空验证码
  revivingClick() : void{
    this.msgCode='';
    this.auth.reviving=!this.auth.reviving;
    
  }
//激活用户
revivingPhoneSubmit(): void {
  const { value } = this.revivingValidateForm;
  let params :any= {
    username:this.auth.revivingName,
    msgCode:value.msgCode
  };
  if(this.phoneLoading){
    return
  }
  this.phoneLoading = true;
  this.auth.revivingLogin(params)
    .subscribe(res => {
      
    }, error => {
      this.message.error(error.statusText);
    }, () => {
      this.phoneLoading = false;
    });
}
  /**
   * 发送验证码
   */
  sendMessageCode(index:number): void {
    let collection = {
      mobileNo: this.pMobileNo.value,
      type: index
    }
    if (index === 5) {
      collection.mobileNo = this.auth.revivingName
    }
    this.phoneLoading = false;
    this.auth.getMsgCode(collection).subscribe((resp: ResponseBody) => {
      if (resp.status === 10000) {
        this.message.success(resp.msg);
        if(index === 5){
          this.revivingDown();
        }else{
          this.countDown();
        }
        
      } else {
        this.message.error(resp.msg);
      }
    }, error => console.log(error), () => this.isLoading = false);
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
 /**
   *  激活用户倒计时
   */
  revivingDown(): void {
    this.revivingDeadline = 1000 * 60;
    let timer = setInterval(() => {
      this.revivingDeadline -= 1000;
      if (this.revivingDeadline === 0) {
        this.revivingDeadline = null;
        window.clearInterval(timer);
      }
    }, 1000);
  }
  eyesImg() {
    let img = this.eyes ? 'image/login/login_eye_01.png' : 'image/login/login_eye_02.png';
    return this.config.baseMobileImgUrl + img;
  }

  /**
   * 滑块人机验证
   * @param val
   */
  isVerify(val) {
    this.sliderVerify = val;
  }
  //设置cookie
  setCookie(key, value, t) {
    // let oDate = new Date();
    // oDate.setDate(oDate.getDate() + t);
    // document.cookie = key + "=" + value + "; expires=" + oDate.toDateString();
    var expire: any = new Date((new Date()).getTime() + t * 60 * 24 * 60000);//有效期 t天
    expire = ";expires=" + expire.toGMTString();
    document.cookie = key + "=" + value + expire;
  }
  //获取cookie
  getCookie(key) {
    let arr1 = document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
    for (let i = 0; i < arr1.length; i++) {
      let arr2 = arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
      if (arr2[0] == key) {
        // Base64.decode  解码Base64  
        return decodeURI(Base64.decode(arr2[1]));
      }
    }
  }
  //删除cookie
  removeCookie(key) {
    this.setCookie(key, "", -1); // 把cookie设置为过期
  };
}
