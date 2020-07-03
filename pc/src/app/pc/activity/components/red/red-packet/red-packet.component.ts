import { Component, OnInit } from '@angular/core';
import { ActivityService } from '@service/activity.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AuthenticationService } from '@src/app/service/authentication.service';
import { CommonService } from '@service/common.service';
import { ConfigService } from '@src/app/config/config.service';


@Component({
    selector: 'app-red-packet',
    templateUrl: './red-packet.component.html',
    styleUrls: ['./red-packet.component.less']
})
export class RedPacketComponent implements OnInit {

    constructor(
        public service: ActivityService,
        public message: NzMessageService,
        public router: Router,
        public auth: AuthenticationService,
        public common: CommonService,
        public config: ConfigService
    ) { }

    ngOnInit() {
        this.service.redPackInit();
    }

    /**
     * @description: 跳转详情页
     * @author: table
     */
    goDetail(): void {
        // 判定是否登录
        if (!this.auth.isAuth) {
            this.common.loginModalVisible = true;
            return;
        }
        this.router.navigateByUrl('activity/red');
    }
}
