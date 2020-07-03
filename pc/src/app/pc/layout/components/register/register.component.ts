import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
// import { ConfigService } from '@src/app/config/config.service';
import { AuthenticationService } from '@src/app/service/authentication.service';
// import { Router } from '@angular/router';
// import { UserService } from '@src/app/service/user.service';
import { CommonService } from "@src/app/service/common.service";
import { _Reg, Validate } from "@src/app/util/validate";
import { Observable, Observer } from 'rxjs';
import { PlatformService } from '@service/platform.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  public phoneValidateForm: FormGroup;
  // 滑块人机验证
  sliderVerify: boolean = false;
  //协议的显示隐藏
  showAgree: boolean = false;
  // 是否快速注册
  isQuick: boolean = true;
  //正则
  public _Reg = _Reg;
  // 发送短信验证码
  deadline: number = null;
  // 注册是否正在请求加载数据
  loading: boolean = false;
  submitForm(type: string): void {
    const form = type === 'quick' ? this.validateForm : this.phoneValidateForm;
    // 当form表单中有disabled form controls时, 该controls默认不会获取到值，也不会进行验证
    // 使用 getRawValue(), 可以获取完整的值
    const value = form.getRawValue();
    if (form.valid) {
      this.loading = true;
      const submit = type === 'quick' ?
        this.auth.quickRegister(value) :
        this.auth.mobileRegister(value);
      submit.subscribe(res => { }, error => {
        this.message.error(error.statusText);
      }, () => {
        this.loading = false;
      });
    }
  }

  /**
 * tab 切换
 * @param e
 */
  isQuickRegistration(e): void {
    let $id = e.target.id;
    this.isQuick = $id === 'tab-0';
    this.sliderVerify = false;
  }

  //重置
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.phoneValidateForm.reset();
    // for (const key in this.validateForm.controls) {
    //   this.validateForm.controls[key].markAsPristine();
    //   this.validateForm.controls[key].updateValueAndValidity();
    // }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }
  // 控制初始化提示文字显示隐藏
  get formValue() {
    return this.validateForm.value;
  }

  // 控制初始化提示文字显示隐藏
  get formPhoneValue() {
    return this.phoneValidateForm.value;
  }
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  //确认密码
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {

    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    public modalService: NzModalService,
    public service: PlatformService,
    private fb: FormBuilder,
    public commonService: CommonService,
    public validate: Validate,
    public auth: AuthenticationService,
    public message: NzMessageService, ) {
    this.validateForm = this.fb.group({
      //账号
      username: ['',
        [Validators.required, Validators.pattern(_Reg.username.reg)]
      ],
      //密码
      password: ['',
        [Validators.required, Validators.pattern(_Reg.password.reg)]
      ],
      //确认密码
      confirm: ['', [this.confirmValidator]],
      //电话
      mobileNo: ['', [Validators.required, Validators.pattern(_Reg.mobile.reg)]],
      //推荐码
      recommendCode: [
        { value: this.commonService.proxyName, disabled: !!this.commonService.proxyName },
        []],
      //协议
      agree: [true],
    });


    this.phoneValidateForm = this.fb.group({
      mobileNo: ['',
        [Validators.required, Validators.pattern(_Reg.mobile.reg)]
      ],
      msgCode: ['',
        [Validators.required, Validators.pattern(_Reg.code.reg)]
      ],
      //推荐码
      recommendCode: [
        { value: this.commonService.proxyName, disabled: !!this.commonService.proxyName },
        []],
      //协议
      agree: [true],
    });
  }
  // 公告
  get noticeList() {
    const noticeArr = this.service.webComConfig.filter(item => !item || item.type === '6');
    return noticeArr.length ? noticeArr[0].configs : [];
  }
  //公告点击弹框事件  
  clickStart(value: string) {
    this.commonService.noticeAlert(value);
  }
  /**
   * 滑块人机验证
   * @param val
   */
  isVerify(val) {
    this.sliderVerify = val;
  }
  ngOnInit(): void {

  }

  // 手机号
  get pMobileNo() {
    return this.phoneValidateForm.get('mobileNo');
  }

  /**
   * 发送验证码
   */
  sendMessageCode(): void {
    this.auth.getMsgCode({
      mobileNo: this.pMobileNo.value,
      type: 1
    }).subscribe(resp => {
      if (resp.status === 10000) {
        this.countDown();
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
  // public quickValidateForm: FormGroup;
  // public phoneValidateForm: FormGroup;
  // public _Reg = _Reg;
  // constructor(
  //     public fb: FormBuilder, public message: NzMessageService,
  //     public config: ConfigService, public auth: AuthenticationService,
  //     public router: Router, public modal: NzModalService,
  //     public user: UserService, public commonService: CommonService,
  //     public validate: Validate
  // ) {}
  // imgList: any = [
  //     {imgUrl: `${this.config.baseImgUrl}images/zhuche/zc_01.jpg`},
  //     {imgUrl: `${this.config.baseImgUrl}images/zhuche/zc_02.jpg`}
  // ];
  // // 快速注册是否正在请求加载数据
  // loading: boolean = false;
  // // 发送短信验证码
  // deadline: number = null;
  // // 是否快速注册
  // isQuick: boolean = true;
  // // 滑块人机验证
  // sliderVerify: boolean = false;

  // ngOnInit() {
  //     this.quickValidateForm = this.fb.group({
  //         username: ['',
  //             [Validators.required, Validators.pattern(_Reg.username.reg)]
  //         ],
  //         password: ['',
  //             [Validators.required, Validators.pattern(_Reg.password.reg)]
  //         ],
  //         mobileNo: ['',
  //             [Validators.required, Validators.pattern(_Reg.mobile.reg)]
  //         ],
  //         recommendCode: [
  //           {value: this.commonService.proxyName, disabled: !!this.commonService.proxyName},
  //           []],
  //         agree: [true, [Validators.requiredTrue]],
  //     });

  //     this.phoneValidateForm = this.fb.group({
  //         mobileNo: ['',
  //             [Validators.required, Validators.pattern(_Reg.mobile.reg)]
  //         ],
  //         msgCode: ['',
  //             [Validators.required, Validators.pattern(_Reg.code.reg)]
  //         ],
  //         recommendCode: [
  //           {value: this.commonService.proxyName, disabled: !!this.commonService.proxyName},
  //           []],
  //         agree: [true, [Validators.requiredTrue]],
  //     });
  // }

  // /**
  //  * tab 切换
  //  * @param e
  //  */
  // isQuickRegistration(e): void {
  //     let $id = e.target.id;
  //     this.isQuick = $id === 'tab-0';
  //     this.sliderVerify = false;
  // }

  // /**
  //  * 滑块人机验证
  //  * @param val
  //  */
  // isVerify(val) {
  //   this.sliderVerify = val;
  // }

  // /**
  //  * 注册
  //  * @param {string} type 快速注册quick   手机注册phone
  //  */
  // submitForm(type: string): void {
  //   const form = type === 'quick' ? this.quickValidateForm : this.phoneValidateForm;
  //   const valid = form.valid;
  //   // 当form表单中有disabled form controls时, 该controls默认不会获取到值，也不会进行验证
  //   // 使用 getRawValue(), 可以获取完整的值
  //   const value = form.getRawValue();
  //   if (valid) {
  //         // 验证推荐码
  //         const { recommendCode } = value;
  //         if (!this.validate.recommendCode_validate(recommendCode)) {
  //           return;
  //         }
  //         this.loading = true;
  //         const fn = type === 'quick' ?  this.auth.quickRegister(value) : this.auth.mobileRegister(value);
  //         fn.subscribe(res => {}, error => {
  //                 this.message.error(error.statusText);
  //             }, () => {
  //                 this.loading = false;
  //           });
  //       }
  //   }

  //   // 手机号
  //   get pMobileNo() {
  //     return this.phoneValidateForm.get('mobileNo');
  //   }

  //   /**
  //    * 发送验证码
  //    */
  //   sendMessageCode(): void {
  //     this.auth.getMsgCode({
  //       mobileNo:  this.pMobileNo.value,
  //       type: 1
  //     }).subscribe(resp => {
  //         if ( resp.status === 10000) {
  //             this.countDown();
  //         }
  //         this.message.info(resp.msg);
  //     }, error => console.log(error));
  // }

  //   /**
  //    *  倒计时
  //    */
  //   countDown(): void {
  //     this.deadline = 1000 * 60;
  //     let timer = setInterval(() => {
  //         this.deadline -= 1000;
  //         if (this.deadline === 0) {
  //             this.deadline = null;
  //             window.clearInterval(timer);
  //         }
  //     }, 1000);
  // }
}
