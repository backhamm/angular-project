import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@src/app/config/config.service';
import { CommonService } from '@service/common.service';
import { UserService } from "@service/user.service";
import { GameService } from "@service/game.service";
import { AuthenticationService } from "@service/authentication.service";
import { NzMessageService } from "ng-zorro-antd";
import { Request } from "@src/app/http/request";
import { ResponseBody } from "@src/app/types/common.type";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'app-game-login-alert',
    templateUrl: './game-login-alert.component.html',
    styleUrls: ['./game-login-alert.component.less']
})
export class GameLoginAlertComponent implements OnInit {
    //
    routerPath: string = "";
    //控制页面显示隐藏
    Pagehide: boolean = true;
    //登录
    public username: string;
    public password: string;

    constructor(
        public common: CommonService,
        public router: Router,
        public message: NzMessageService,
        public request: Request,
        public auth: AuthenticationService
    ) {
        //同时具有监听的功能  控制页面登录框显示隐藏
        this.router.events.subscribe((data) => {
            //data返回一堆路由事件，所有得筛选自己需要的，这里选择路由导航结束之后
            if (data instanceof NavigationEnd) {
                this.routerPath = data.url.substr(1);
                if (this.routerPath.indexOf('register') != -1) {
                    this.Pagehide = false
                } else {
                    this.Pagehide = true

                }
            }
        })
    }

    ngOnInit() {
    }

    /**
     * 登录
     * @ param value
     * @ return {Observable<ResponseBody>}
     */
    login(username: string, password: string): void {
        if (!username) {
            this.message.error('用户名不能为空');
            return;
        }
        if (!password) {
            this.message.error('密码不能为空');
            return;
        }
        this.request.post('unauthor/gateway/account/login', {
            username, password
        }).subscribe((res: ResponseBody) => {
            if (res.status == 30001) {
                this.auth.activeLogin = true;
                this.common.loginModalVisible = this.auth.phoneLogin = this.auth.errorLogin = this.auth.passwordInfo = false;
                if(res.data.mobile){
                    this.auth.loginData = res.data
                    this.auth.phoneLogin = true
                }else{
                  this.auth.errorLogin = true;   
                } 
            } else {
                this.auth.loginAfter(res);
            }
        }
        );
    }
}
