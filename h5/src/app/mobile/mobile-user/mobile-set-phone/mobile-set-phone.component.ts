import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from "@service/user.service";
import {NzMessageService} from 'ng-zorro-antd';
import {PlatformService} from "@service/platform.service";
import {_Reg} from "@src/app/util/validate";
import {AuthenticationService} from "@service/authentication.service";
import {Location} from "@angular/common";
import {CommonService} from "@service/common.service";
@Component({
    selector: 'app-mobile-set-phone',
    templateUrl: './mobile-set-phone.component.html',
    styleUrls: ['./mobile-set-phone.component.less']
})
export class MobileSetPhoneComponent implements OnInit, OnDestroy {

    //设置显示状态内容
    public success: boolean = false;
    //手机验证码倒计时状态
    public isGeting: boolean = true;
    public timeConunt: number = 60;
    //用户输入信息
    public userInfo: { password: any, mobileNo: any, msgCode: any } = {
        mobileNo: '',
        msgCode: '',
        password: ''

    };
    // 验证正则匹配属性
    public mapData = {
        mobileNo: 'mobile',
        msgCode: 'code',
        password: 'password',
    }
    // 定时器
    public timer: any;

    constructor(public user: UserService,
                public message: NzMessageService,
                public common: CommonService,
                public plat: PlatformService,
                public auth: AuthenticationService,
                public location: Location) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }

    //获取手机验证码
    getPhone() {
        if (!this.isGeting) {
            return;
        }
        const { mobileNo } = this.userInfo;
        if (!_Reg.mobile.reg.test(mobileNo)) {
            this.message.error(_Reg.mobile.message);
            return;
        }
        this.auth.getMsgCode({mobileNo: mobileNo, type: 4 }).subscribe(res => {
            if (res.status === 10000) {
                this.message.success('验证码发送成功');
                this.countDown();
            } else {
                this.message.error(res.msg);
            }
        });

    }

    countDown() {
        this.isGeting = false;

        this.timer = setInterval(() => {
            this.timeConunt--;
            if (this.timeConunt === 0) {
                this.isGeting = true;
                clearInterval(this.timer);
            }
        }, 1000);
    }

    next() {
        // 验证输入框
        for (let [key, value] of Object.entries(this.userInfo)) {
            const { reg, message } = _Reg[this.mapData[key]];
            if (!reg.test(value)) {
                return this.message.error(message);
            }
        }
        this.common.loading = true;
        this.user.changeUserPhone(this.userInfo).subscribe(res => {
            if (res.status === 10000) {
                this.success = true;
                this.message.success(res.msg);
                this.location.back();
            } else {
                this.message.error(res.msg);
            }
        }, null, () => this.common.loading = false);

    }

}
