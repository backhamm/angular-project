import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {CapitalService} from "@service/capital.service";

@Component({
    selector: 'app-mobile-capital-proxy-invite',
    templateUrl: './mobile-capital-proxy-invite.component.html',
    styleUrls: ['./mobile-capital-proxy-invite.component.less']
})
export class MobileCapitalProxyInviteComponent implements OnInit {
    public inviteType: any = {};
    public isLoading: boolean = false;
    public flag: boolean = false;

    constructor(public message: NzMessageService, public capitalService: CapitalService) {
    }

    ngOnInit() {
        this.getInviteType(false);
    }

    /**
     * @author Merlin
     * @date 2019/8/8
     * @Description:获取邀请方式
     * @params: isFresh 是否是刷新
     * @return:
     */
    getInviteType(isFresh: boolean): void {
        this.isLoading = true;
        this.capitalService.getInviteType().subscribe(res => {
            this.isLoading = false;
            if (res.status === 10000) {
                this.inviteType = res.data;
                if (isFresh) {
                    this.message.success('刷新成功');
                }
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 复制
     * @author: table
     * @param value 状态
     */
    copied(value: any): void {
        if (value.isSuccess) {
            this.message.success('复制成功');
        } else {
            this.message.success('复制失败');
        }
    }

    refresh() {
        if (!this.flag) {
            this.getInviteType(true);
            this.flag = true;
            // 刷新时间间隔五秒
            setTimeout(() => {
                this.flag = false;
            }, 5000);
        } else {
            this.message.error('刷新频率太快，请稍后尝试');
            return;
        }
    }
}
