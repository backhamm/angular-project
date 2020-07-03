import {Component, OnInit} from '@angular/core';
import {PlatformService} from '@src/app/service/platform.service';
import {WebComConfig} from "@src/app/types/common.type";
import {CommonService} from '@src/app/service/common.service';
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import {NzModalService} from 'ng-zorro-antd';

@Component({
    selector: 'app-page-rolling',
    templateUrl: './page-rolling.component.html',
    styleUrls: ['./page-rolling.component.less']
})
export class PageRollingComponent implements OnInit {
    routerPath: string = "";
    //控制页面登录显示隐藏
    PageRoll: boolean = true;
    public noticeIndex = 0;

    constructor(
        public platService: PlatformService,
        public common: CommonService,
        public router: Router,
        public route: ActivatedRoute,
        public modal: NzModalService,) {

        //同时具有监听的功能  控制页面登录框显示隐藏
        this.router.events.subscribe((data) => {
            //data返回一堆路由事件，所有得筛选自己需要的，这里选择路由导航结束之后
            if (data instanceof NavigationEnd) {
                this.routerPath = data.url.substr(1);
                if (this.routerPath.indexOf('home/index') != -1 || this.routerPath.indexOf('game/dtqp') != -1 || this.routerPath.indexOf('home/download') != -1 || this.routerPath.indexOf('integral/integralRule') != -1 || this.routerPath.indexOf('center') != -1 || this.routerPath == 'home' || this.routerPath == '') {
                    this.PageRoll = false;
                } else {
                    this.PageRoll = true;
                }
            }
        });
    }

    ngOnInit() {
    }

    // 公告
    get noticeList() {
        const noticeArr = this.platService.webComConfig.filter(item => !item || item.type === '6');
        return noticeArr.length ? noticeArr[0].configs : [];
    }

    noticeClick(item, i) {
        this.noticeIndex = i;
    }

    // 公告弹框
    noticeAlert(item: WebComConfig): void {
        this.common.noticeAlert(item.data);
    }
}
