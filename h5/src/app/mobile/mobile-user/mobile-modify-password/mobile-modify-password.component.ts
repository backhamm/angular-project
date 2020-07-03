import {Component, OnInit} from '@angular/core';
import {UserService} from '@service/user.service';
import {NzMessageService} from "ng-zorro-antd";
import {Router} from '@angular/router';
import {Validate} from "@src/app/util/validate";
import {AuthenticationService} from "@service/authentication.service";
import {ResponseBody} from "@src/app/types/common.type";

@Component({
    selector: 'app-mobile-modify-password',
    templateUrl: './mobile-modify-password.component.html',
    styleUrls: ['./mobile-modify-password.component.less']
})
export class MobileModifyPasswordComponent implements OnInit {
    public indicatedKey:any={
        indicated:true
    };
    //用户输入的内容
    public userInfo: { password: string, npassword: string, renpassword: string } = {
        password: '',
        npassword: '',
        renpassword: ''
    };
    //设置显示状态内容
    public success: boolean = false;

    constructor(public user: UserService,
                public message: NzMessageService,
                public router: Router,
                public validate: Validate,
                public auth: AuthenticationService) {
    }

    ngOnInit() {
 //控制激活用户页面的提示框
 let inKey = JSON.parse(sessionStorage.getItem('indicatedKey'));
 if(inKey){
   this.indicatedKey=inKey.indicated
 }
    }



    next() {
        const { password, npassword, renpassword} = this.userInfo;
        const {singleValidateFn} = this.validate;
        if (!singleValidateFn('password', password) || !singleValidateFn('password', npassword)) {
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
        this.user.changePassword(this.userInfo).subscribe((res: ResponseBody) => {
            if (res.status === 20004) {
                  //修改密码后  激活客户提示框不在弹出  关闭登录页面激活用户框
                  sessionStorage.removeItem('indicatedKey');
                  this.auth.reviving=false;
                this.success = true;
                this.message.success(res.msg);
                this.auth.removeAuthentication('/m/register');
            } else {
                this.message.error(res.msg);
            }
        });
    }

}
