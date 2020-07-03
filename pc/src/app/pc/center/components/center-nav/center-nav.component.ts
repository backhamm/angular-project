import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@src/app/service/authentication.service';
import QRCode from 'qrcode';
import {ConfigService} from "@src/app/config/config.service";
import {UserService} from "@service/user.service";

@Component({
    selector: 'app-center-nav',
    templateUrl: './center-nav.component.html',
    styleUrls: ['./center-nav.component.less']
})
export class CenterNavComponent implements OnInit {

    constructor(
        public auth: AuthenticationService, public config: ConfigService,
        public user: UserService
    ) { }

    get username(): string {
        return this.user.user.username;
    }

    verifyText: string[] = [
        '手机未认证',
        '银行卡未设置',
        '手机已认证',
        '银行卡已设置'
    ];

    /**
     * 导航列表
     */
    navList: { navName: string, link: string, iconType: string }[] = [
        {
            navName: '额度转换',
            link: '/center/interchange-auto',
            iconType: 'chrome'
        }, {
            navName: '存款专区',
            link: '/center/deposit',
            iconType: 'account-book'

        }, {
            navName: '取款专区',
            link: '/center/withdraw',
            iconType: 'credit-card'
        },
      // {
      //       navName: '无限代理',
      //       link: '/center/proxy',
      //       iconType: 'control'
      //   },
        {
            navName: '资金记录',
            link: '/center/funds',
            iconType: 'profile'
        }, {
            navName: '投注记录',
            link: '/center/betting',
            iconType: 'project'
        }, {
            navName: '个人资料',
            link: '/center/personal',
            iconType: 'schedule'
        }, {
            navName: '信息公告',
            link: '/center/news',
            iconType: 'mail'
        }, {
            navName: '修改密码',
            link: '/center/modify_password',
            iconType: 'lock'
        }
    ];

    // 导航判断
    navJudge(link: string, i: number): boolean {
        try {
            let path = window.location.pathname;
            return path === link || (path === '/center/interchange-hand' && i === 0);
        } catch (e) {

        }
    }


    qrCode(): void {
        // tslint:disable-next-line:no-unused-expression
        let canvas = document.getElementById('canvas');
        let url = this.config.downloadAppUrl;
        QRCode.toCanvas(canvas, url, {width: 180}, function (error) {
            if (error) {
                console.error(error);
            }
        });
    }


    ngOnInit() {
        this.qrCode();
    }

}
