import {Component, OnInit} from '@angular/core';
import {ConfigService} from '@src/app/config/config.service';
import {UserService} from '@src/app/service/user.service';
import {AuthenticationService} from '@src/app/service/authentication.service';
import {NzModalService, NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-mobile-personal',
    templateUrl: './mobile-personal.component.html',
    styleUrls: ['./mobile-personal.component.less']
})
export class MobilePersonalComponent implements OnInit {

    //用户信息
    public userinfo: any = {};

    //用户设置提款密码状态
    public userWithdrawal: boolean = false;
    //用户银行卡号
    public cardNum: any = '';
    //用户修改跳转
    public src = {
        name: '/m/user/personalName/1',
        weixin: '/m/user/personalName/2',
        qq: '/m/user/personalName/3',
        phone: '/m/user/userPhone',
    };
    //  是否加载中
    public isLoading: boolean = false;
    public isVisible = false;

    constructor(public config: ConfigService, public user: UserService, public auth: AuthenticationService, public modalService: NzModalService,
                public message: NzMessageService) {
    }

    ngOnInit() {
        this.getUserinfo();
    }

    //获取用户信息
    get username(): string {
        return this.user.user.username;
    }

    getUserinfo() {
        this.isLoading = true;
        this.user.getUserInfo().subscribe(res => {
            res.status === 10000 ? this.userinfo = {...res.data} : this.userinfo = {};
            this.isLoading = false;
        });
    }
}
