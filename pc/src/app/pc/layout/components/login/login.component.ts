import { Component, OnInit } from '@angular/core';
import {ConfigService} from '@src/app/config/config.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '@service/common.service';
import {NzMessageService} from 'ng-zorro-antd';
import {AuthenticationService} from '@src/app/service/authentication.service';
import {Router} from '@angular/router';
import {UserService} from "@service/user.service";
import {PlatformService} from "@service/platform.service";
import {_Reg} from "@src/app/util/validate";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    public loginValidateForm: FormGroup;
    public _Reg = _Reg;

    loading = false;

    constructor(
        public config: ConfigService, public fb: FormBuilder,
        public auth: AuthenticationService, public message: NzMessageService,
        public router: Router, public commonService: CommonService,
        public user: UserService, public platformService: PlatformService
    ) {}

    ngOnInit() {
        this.loginValidateForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(_Reg.username.reg)]],
            password: ['', [Validators.required, Validators.pattern(_Reg.password.reg)]]
        });
    }

    loginSubmit(): void {
        this.loading = true;
        const {value, valid} = this.loginValidateForm;
        if (valid) {
            this.auth.login(value).subscribe(res => {
                if (res.status === 10000) {
                  this.loading = false;
                  setTimeout(() => {
                    this.commonService.loginModalVisible = false;
                  }, 10);
                }
             },
             error => {
               this.message.error(error.toString());
            }, () => {
                this.loading = false;
            });
        }
    }

    toRegister(): void {
        this.commonService.toggleLoginModal();
        this.router.navigateByUrl('/register');
    }
}
