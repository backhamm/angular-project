import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'app-mobile-deposit-order',
    templateUrl: './mobile-deposit-order.component.html',
    styleUrls: ['./mobile-deposit-order.component.less']
})
export class MobileDepositOrderComponent implements OnInit {

    constructor(public route: ActivatedRoute, public el: ElementRef, public location: Location) {
    }

    public orderData: any = null;

    ngOnInit() {
        this.dealParams();
    }


    dealParams(): any {
        // 通过路由传递参数，保证刷新问题
        this.route.queryParams.subscribe((res: any) => {
            if (!(Object.keys(res).length)) {
                return this.location.back();
            }
            this.orderData = res;
            // 如果type值form 默认就选择提交表单
            if (res.viewType === 'form') {
                this.el.nativeElement.querySelector('#submit-pay').innerHTML = res.data;
                this.el.nativeElement.querySelector('#actform').submit();
                return;
            }
        });
    }
}
