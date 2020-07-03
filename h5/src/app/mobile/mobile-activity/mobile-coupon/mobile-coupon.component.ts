import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from "@service/activity.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {AuthenticationService} from "@src/app/service/authentication.service";

@Component({
    selector: 'app-mobile-coupon',
    templateUrl: './mobile-coupon.component.html',
    styleUrls: ['./mobile-coupon.component.less']
})
export class MobileCouponComponent implements OnInit, OnDestroy {

    public hasCoupon = false;
    public diff: any;
    public days: any;
    public hours: any;
    public minutes: any;
    public seconds: any;
    public timer: any;

    constructor(
        public baseActivity: ActivityService,
        public router: Router,
        public message: NzMessageService,
        public auth: AuthenticationService
    ) {}

    timeDifference() {
        this.timer = setInterval(() => {
            this.countDownFn();
        }, 1000);
    }

    countDownFn() {
        if (this.diff === 0) {
            return clearInterval(this.timer);
        }
        this.diff--;
        let dayDiff: any = Math.floor(this.diff / (24 * 3600)); //计算出相差天数
        dayDiff = dayDiff < 10 ? '0' + dayDiff : dayDiff;
        let leave1 = this.diff % (24 * 3600);    //计算天数后剩余的毫秒数
        let hours: any = Math.floor(leave1 / (3600)); //计算出小时数
        hours = hours < 10 ? '0' + hours : hours;
        let leave2 = leave1 % (3600);    //计算小时数后剩余的毫秒数
        let minutes: any = Math.floor(leave2 / (60)); //计算相差分钟数
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let leave3 = leave2 % (60);      //计算分钟数后剩余的秒数
        let seconds: any = Math.round(leave3);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        this.days = dayDiff;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    //关闭红包弹窗
    closeCoupon() {
        this.hasCoupon = this.baseActivity.hasCoupon = false;
    }

    goMainPage() {
        this.auth.isAuth ? this.router.navigate(['/m/activity/coupons']) : this.router.navigate(['/m/login']);
    }

    init() {
        if (!this.baseActivity.hasCoupon) { return; }
        this.baseActivity.getRedStatus().subscribe(res => {
            if (res.status === 10000 &&  res.data.status !== 'faild') {
                this.hasCoupon = true;
                this.diff = res.data.diff;
                this.timeDifference();
            } else {
            	// 处理是否有红包
            	this.baseActivity.activeCoupon = false;
            }
        });
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        clearInterval(this.timer);
        this.baseActivity.hasCoupon = false;
    }
}
