import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";
import {ActivityService} from "@service/activity.service";
import {AuthenticationService} from "@src/app/service/authentication.service";
import {NzMessageService} from "ng-zorro-antd";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {UserService} from '@service/user.service';

@Component({
    selector: 'app-mobile-coupon-home',
    templateUrl: './mobile-coupon-home.component.html',
    styleUrls: ['./mobile-coupon-home.component.less']
})
export class MobileCouponHomeComponent implements OnInit, OnDestroy {

    constructor(
        public baseConfig: ConfigService,
        public baseActivity: ActivityService,
        public auth: AuthenticationService,
        public message: NzMessageService,
        public location: Location,
        public router: Router,
        public user: UserService
    ) {
        this.visibilityChange = this.visibilityChange.bind(this);
    }

    public list: Array<any> = [];
    public timer: any;
    public openRain = false;
    public liParams: Array<any> = [];
    public options: object;
    public diff: number;
    public isOpenRain: boolean = false;
    public openResult: boolean = false;
    public getprices: any = '';

    /**
     * 回收dom节点
     */
    removeDom(e) {
        const target: any = e.target;
        document.querySelector('.coupon-rain-list').removeChild(target);
    }

    /**
     * 动画效果
     */
    startRedPacket() {
        const win = document.documentElement.clientWidth || document.body.clientWidth;
        const left = (Math.random() * (win - 50)).toFixed();
        const rotate = (Math.random() * (45 - (-45)) - 45).toFixed() + 'deg'; // 旋转角度
        const scales = (Math.random() * (12 - 8 + 1) + 8) * 0.1; // 图片尺寸
        const durTime = (Math.random() * (2.5 - 1.2 + 1) + 3.2) + 's'; // 时间 1.2和1.2这个数值保持一样
        this.liParams.push({
            left: left + 'px',
            transforms: 'rotate(' + rotate + ') scale(' + scales + ')',
            durTime
        });
    }

    /**
     * 开启动画
     */
    appear() {
        if (!this.auth.isAuth) {
            return this.router.navigate(['/m/login']);
        }
        if (!this.isOpenRain) {
            return this.message.create('warning', '活动即将开始！');
        }
        this.openRain = true;
        this.timer = setInterval(() => {
            this.startRedPacket();
        }, 500);
    }

    returns() {
        clearInterval(this.timer);
        this.liParams = [];
        this.openRain = !this.openRain;
        return this.location.back();
    }

    isAppear() {
        this.isOpenRain = true;
    }

    /**
     * 获取红包
     */
    getAward() {
        try {
            let username = this.user.user.username;
            this.baseActivity.grabRed().subscribe((res: any) => {
                if (res.status === 10000) {
                    this.openResult = true;
                    this.getprices = res.data.luckMoney;
                } else {
                    this.message.warning(res.msg);
                }
            });
        } catch (e) {
            this.message.error('请先登录！');
            this.router.navigate(['/m/login']);
        }
    }

    // 用户离开当前标签页时停止红包雨动画并清空红包雨列表，返回时重新开启红包雨动画
    visibilityChange() {
        if (document.hidden) {
            this.liParams = [];
            clearInterval(this.timer);
        } else {
            if (this.openRain) {
                this.appear();
            }
        }
    }

    init() {
        this.baseActivity.getRedStatus().subscribe(res => {
        	console.log(res)
        	if (res.status === 10000) {
		        if (res.data.status === 'faild') {
			        this.message.error(res.data.msg);
			        return this.location.back();
		        }
		        this.diff = res.data.diff;
		        this.isOpenRain = !this.diff;
	        }

        });
        for (let i = 0; i < 12; i++) {
            const money = (Math.random() * 5 + 8).toFixed(2);
            this.list.push(`玩家**在红包雨中抢得￥${money}元`);
        }
        this.options = {
            scrollArr: this.list,
            lineHeight: '.53rem'
        };
        document.addEventListener('visibilitychange', this.visibilityChange);
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.liParams = [];
        document.removeEventListener('visibilitychange', this.visibilityChange);
        clearInterval(this.timer);
    }

}
