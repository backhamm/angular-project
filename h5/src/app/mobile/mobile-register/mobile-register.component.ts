import {Component, OnInit} from '@angular/core';
import {UserService} from "@service/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@src/app/service/authentication.service";
import {ConfigService} from "@src/app/config/config.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {_Reg} from "@src/app/util/validate";
import {ResponseBody} from "@src/app/types/common.type";
import helpObj from '@src/app/mobile/mobile-help/help';

@Component({
  selector: 'app-mobile-register',
  templateUrl: './mobile-register.component.html',
  styleUrls: ['./mobile-register.component.less']
})
export class MobileRegisterComponent implements OnInit {
  public quickValidateForm: FormGroup;
  public _Reg: any = _Reg;
  public phoneValidateForm: FormGroup;

  constructor(
    public fb: FormBuilder, public message: NzMessageService,
    public config: ConfigService, public auth: AuthenticationService,
    public router: Router, public modal: NzModalService,
    public user: UserService
  ) {
    this.issueDetails = helpObj['issueDetailsList']['loginIssue0'];
  }

  // 注册协议
  public agreement: boolean = false;

  // 注册协议
  public issueDetails: any = [];

  // 快速注册是否正在请求加载数据
  loading: boolean = false;

  // 手机注册
  phoneLoading: boolean = false;

  // 发送短信验证码
  deadline: number = null;

  // 发送验证码的全局loading
  isLoading: boolean = false;

  /**
   * 是否快速注册
   */
  isQuick: boolean = true;
  // 滑块人机验证
  sliderVerify: boolean = false;
  // 手机注册
  sliderVerifyPhone: boolean = false;

  ngOnInit() {
    this.quickValidateForm = this.fb.group({
      recommendCode: ['', []],
      username: ['',
        [Validators.required, Validators.pattern(_Reg.username.reg)]
      ],
      password: ['',
        [Validators.required, Validators.pattern(_Reg.password.reg)]
      ],
      mobileNo: ['',
        [Validators.required, Validators.pattern(_Reg.mobile.reg)]
      ],
      agree: [true, [Validators.requiredTrue]],

    });

    this.phoneValidateForm = this.fb.group({
      recommendCode: ['', []],
      mobileNo: ['',
        [Validators.required, Validators.pattern(_Reg.mobile.reg)]
      ],
      msgCode: ['',
        [Validators.required, Validators.pattern(_Reg.code.reg)]
      ],
      agree: [true, [Validators.requiredTrue]],
    });
  }

  // 快速注册
  get username() {
    return this.quickValidateForm.get('username');
  }

  get password() {
    return this.quickValidateForm.get('password');
  }

  get mobileNo() {
    return this.quickValidateForm.get('mobileNo');
  }

  get recommendCode() {
    return this.quickValidateForm.get('recommendCode');
  }

  get isAgree() {
    return this.quickValidateForm.get('agree');
  }

  // 手机注册
  get pMobileNo() {
    return this.phoneValidateForm.get('mobileNo');
  }

  get pImgCode() {
    return this.phoneValidateForm.get('msgCode');
  }

  get pIsAgree() {
    return this.phoneValidateForm.get('agree');
  }


  isQuickRegistration(e): void {
    let $id = e.target.id;
    this.isQuick = $id === 'tab-0';
  }

  /**
   * 滑块人机验证
   * @param val
   */
  isVerify(val) {
    this.sliderVerify = val;
  }

  isVerifyPhone(val) {
    this.sliderVerifyPhone = val;
  }

  /**
   * 快速注册
   */
  quickSubmitForm(): void {
    this.loading = true;
    if (this.quickValidateForm.valid) {
      this.auth.quickRegister(this.quickValidateForm.value)
        .subscribe((res: any) => {
        }, error => {
          this.message.error(error.statusText);
        }, () => {
          this.loading = false;
        });
    }
  }

  /**
   *  手机注册
   */
  phoneSubmitForm(): void {
    this.phoneLoading = true;
    if (this.phoneValidateForm.valid) {
      this.auth.mobileRegister(this.phoneValidateForm.value)
        .subscribe(res => {
        }, error => {
          this.message.error(error.statusText);
        }, () => {
          this.phoneLoading = false;
        });
    }
  }


  /**
   * 发送验证码
   */
  sendMessageCode(): void {
    this.phoneLoading = false;
    this.isLoading = true;
    this.auth.getMsgCode({
      mobileNo: this.pMobileNo.value,
      type: 1
    }).subscribe((resp: ResponseBody) => {
      if (resp.status === 10000) {
        this.message.success(resp.msg);
        this.countDown();
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

  /*quickCallback(check: boolean) {
      this.quickSliding = check;
  }

  phoneCallback(check: boolean) {
      this.phoneSliding = check;
  }*/
}
