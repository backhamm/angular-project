import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {PlatformService} from "@service/platform.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
    selector: 'app-mobile-deposit-obank-order',
    templateUrl: './mobile-deposit-obank-order.component.html',
    styleUrls: ['./mobile-deposit-obank-order.component.less']
})
export class MobileDepositObankOrderComponent implements OnInit {
    public minutes: number = 59;
    public seconds: number = 59;
    public orderData: any = {};
    public isVisible: any = false;
    public type: number = 1;
    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public plat: PlatformService,
                public message: NzMessageService) {
    }

    timeRemaining() {
        setTimeout(() => {
            this.seconds--;
            if (this.seconds === 0) {
                this.seconds = 59;
                this.minutes--;
                if (this.minutes === 0) {
                    this.router.navigateByUrl('/m/capital/deposit');
                }
            }
            this.timeRemaining();
        }, 1000);
    }

    // 处理路由参数
    dealParams(): void {
        // 通过路由传递参数，保证刷新问题
        this.route.queryParams.subscribe((res) => {
            if (!(Object.keys(res).length)) {
                return this.location.back();
            }
            this.orderData = res;
        });
    }

    ngOnInit() {
        this.timeRemaining();
        this.dealParams();
    }

    confirm(type: number): void {
        this.type = type;
        this.isVisible = true;
    }

    goBack(): void {
        this.isVisible = false;
        this.location.back();
    }

    // 复制文本内容
    copied(value): void {
        if (value.isSuccess) {
            this.message.success('复制成功');
        } else {
            this.message.success('复制失败');
        }
    }
}
