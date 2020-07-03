import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {UserService} from "@service/user.service";
import {Router} from '@angular/router';
import {Validate} from "@src/app/util/validate";
import {ResponseBody} from "@src/app/types/common.type";

@Component({
    selector: 'app-mobile-setting-withdraw-password',
    templateUrl: './mobile-setting-withdraw-password.component.html',
    styleUrls: ['./mobile-setting-withdraw-password.component.less']
})
export class MobileSettingWithdrawPasswordComponent implements OnInit {
    // 是否返回上一级菜单页面
    @Input() isGoBack: boolean = true;
    //  是否加载中
    public isLoading: boolean = false;
    //用户输入的内容
    public params: { password: string, npassword: string, renpassword: string } = {
        password: '',
        npassword: '',
        renpassword: ''
    };
    //设置显示状态内容
    public success: boolean = false;

    //加载
    constructor(public user: UserService,
                public message: NzMessageService,
                public router: Router,
                public validate: Validate) {
    }

    ngOnInit() {
    }

    //修改提款密码
    chengePwd(): any {
        const {password, npassword, renpassword } = this.params;
        const {singleValidateFn} = this.validate;
        if (!singleValidateFn('withdrawPassword', password) || !singleValidateFn('withdrawPassword', npassword)) {
            return;
        }
        if (password === npassword) {
            this.message.error('新密码不能与原密码相同，请重新输入!');
            return;
        }
        if (npassword !== renpassword) {
            this.message.error('确认密码与新密码不一致，请重新输入！');
            return;
        }
        this.changePwd();

    }

    changePwd() {
        this.user.changeQkpwd(this.params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.success = true;
                this.message.success(res.msg);
                // 更新数据
                this.user.userInfo.hasWithdrawPassword = true;
                // 如果是提款页面不进行跳转
                this.isGoBack && this.router.navigate(['/m/user/setSafety']);
            } else {
                this.message.error(res.msg);
            }
        });
    }

    //设置提款密码
    setPwd(): any {
        const {singleValidateFn} = this.validate;
        const { npassword, renpassword } = this.params;
        if (!singleValidateFn('withdrawPassword', npassword)) {
            return;
        }

        if (npassword !== renpassword) {
            this.message.error('确认密码与新密码不一致，请重新输入！');
            return;
        }
        this.changePwd();
    }

}
