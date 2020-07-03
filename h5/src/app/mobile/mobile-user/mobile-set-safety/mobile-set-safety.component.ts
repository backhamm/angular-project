import {Component, OnInit} from '@angular/core';
import {ConfigService} from '@src/app/config/config.service';
import {UserService} from '@src/app/service/user.service';
import {AuthenticationService} from '@src/app/service/authentication.service';
import {NzModalService, NzMessageService} from 'ng-zorro-antd';
import {ResponseBody} from "@src/app/types/common.type";

@Component({
    selector: 'app-mobile-set-safety',
    templateUrl: './mobile-set-safety.component.html',
    styleUrls: ['./mobile-set-safety.component.less']
})
export class MobileSetSafetyComponent implements OnInit {

    //用户银行卡号
    public bankInfo: any = {};
    //用户修改跳转
    //  是否加载中
    public isLoading: boolean = false;

    constructor(public config: ConfigService, public user: UserService, public auth: AuthenticationService, public modalService: NzModalService,
                public message: NzMessageService) {
    }

    ngOnInit() {
        this.user.user.hasBankCard && this.getUserCard();
    }

    //检查用户是否绑定银行卡
    getUserCard(): any {
        this.user.getUserCard().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
               this.bankInfo = res.data;
            }
        });
    }
}
