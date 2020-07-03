import {Component, OnInit} from '@angular/core';
import {ConfigService} from '@src/app/config/config.service';
import {UserService} from '@src/app/service/user.service';
import {AuthenticationService} from '@src/app/service/authentication.service';
import {CapitalService} from "@service/capital.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {ResponseBody} from "@src/app/types/common.type";

@Component({
    selector: 'app-mobile-center',
    templateUrl: './mobile-center.component.html',
    styleUrls: ['./mobile-center.component.less']
})
export class MobileCenterComponent implements OnInit {
    //  是否加载中
    public isLoading: boolean = false;
    // 提佣弹框
    public commissionVisible = false;
    // 无限代理的图片设定
    public agentSrc: any = null;
    // centerList会员中心的跳转列表
    public centerList: any = [
        {
            title: '资金转换',
            list: [
                {link: '/m/capital/deposit', className: 'x-icon-Mem3 x-icon', name: '存款'},
                {link: '/m/capital/withdraw', className: 'x-icon-Mem2 x-icon', name: '取款'},
                {link: '/m/capital/transferAccounts', className: 'x-icon-Mem1 x-icon', name: '转账'},
            ]
        },
        {
            title: '交易记录',
            list: [
                {link: '/m/user/capital-funds', className: 'x-icon-Mem4 x-icon', name: '资金记录'},
                {link: '/m/user/capital-betting', className: 'x-icon-Mem5 x-icon', name: '投注记录'},
                // {link: '/m/capital/proxy', className: 'x-icon-Mem5 x-icon', name: '无限代理'},
            ]
        },
        {
            title: '其它',
            list: [
                {link: '/m/user/setSafety', className: 'x-icon-Mem9 x-icon', name: '安全设置'},
                {link: '/m/activity/discount', className: 'x-icon-Mem10 x-icon', name: '优惠活动'},
                {link: '/m/help', className: 'x-icon-Mem13 x-icon', name: '帮助中心'},
            ]
        }
    ];

    constructor(public config: ConfigService,
                public user: UserService,
                public auth: AuthenticationService,
                public capitalService: CapitalService,
                public message: NzMessageService,
                public router: Router) {
    }

    ngOnInit() {
        this.getUserinfo();
    }

    //获取用户信息
    get username(): string {
        try {
	        return this.user.user.username;
        } catch (e) {

        }
    }

    getUserinfo() {
        this.isLoading = true;
        this.user.getUserInfo().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                const {agencyStatus} = res.data;
                if (Number(agencyStatus) === 2) {
                    this.getProxyConfig();
                }
            }
        }, null, () => {
            this.isLoading = false;
        });
    }
    /**
     * 获取未加入无限代理的图片信息
     */
    getProxyConfig(): void {
        this.capitalService.getProxyConfig().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.agentSrc = res.data.appPersonal;
            }
        });
    }

    withdrawlCommission(): void {
        /**
         * @description 检测提款密码、银行卡, 用户信息中的cardStatus来判断是否绑定银行卡
         */
        const {hasBankCard} = this.user.userInfo;
        // 已设定
        if (hasBankCard) {
            this.commissionVisible = true;
            return;
        }
        // 未绑定，先验证有没有设定提款密码
        this.getBankCardPwd();
    }

    getWithdrawlComm(): void {
        const {commissionBeginDate, commissionEndDate, outstandingCommissions} = this.user.userInfo;
        const params = {
            amount: Number(outstandingCommissions),
            commissionBeginDate,
            commissionEndDate
        };
        this.capitalService.getWithdrawlComm(params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.commissionVisible = false;
                this.message.success('提佣成功');
                // 刷新用户信息内容
                this.getUserinfo();
            } else {
                this.message.error(res.msg);
            }
        });
    }

    //检查用户是否设置取款密码
    getBankCardPwd() {
        this.user.checkQkpwd().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                // 未设定
                if (!res.data) {
                    this.message.info('你还没有设置提款密码，3秒之后将会跳转到设置提款密码页面');
                    setTimeout(() => {
                        this.router.navigate(['/m/user/userWithdrawal']);
                    }, 3000);
                } else {
                    this.message.info('你还没有绑定银行卡，3秒之后将会跳转到绑定银行卡页面');
                    setTimeout(() => {
                        this.router.navigate(['/m/user/userBankCard']);
                    }, 3000);
                }

            } else {
                this.message.error(res.msg);
            }
        });
    }
}

