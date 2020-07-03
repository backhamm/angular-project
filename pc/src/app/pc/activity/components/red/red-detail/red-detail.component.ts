import {Component, OnInit} from '@angular/core';
import {ActivityService} from '@service/activity.service';
import {RedCommon} from '../red-common';
import {AuthenticationService} from '@src/app/service/authentication.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import { ConfigService } from '@src/app/config/config.service';
import {UserService} from '@service/user.service';
import {ResponseBody} from "@src/app/types/common.type";

@Component({
    selector: 'app-red-detail',
    templateUrl: './red-detail.component.html',
    styleUrls: ['./red-detail.component.less']
})
export class RedDetailComponent implements OnInit {
    //中奖数据
    winning: string[] = [];
    //红包 width:红包大小,img:红包图片,animate:红包动画
    redPacket: { width: number, img: number, animate: number }[] = [];
    //红包个数
    public redNum: number = 0;
    public redMax: number = 20;
    //滚动中奖数据条数
    public swiperNum: number = 16;
    //红包金额
    redMoney: number = 0;

    constructor(
        public service: ActivityService,
        public red: RedCommon,
        public auth: AuthenticationService,
        public router: Router,
        public message: NzMessageService,
        public config: ConfigService,
        public user: UserService
    ) { }

    ngOnInit() {
        //隐藏大小红包
        this.service.redSmall = false;
        //如未登录，返回首页
        if (!this.auth.isAuth) {
            this.router.navigateByUrl('home');
        }
        // 生成中奖金额
        this.winning = this.getMoney;
        //查询红包状态
        this.getStatus();
    }

    /**
     * @description: 获取红包状态
     * @author: table
     */
    getStatus(): void {
        this.service.getRedStatus().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                const {diff, status} = res.data;
                if (status === 'success' || status === 'waiting') {
                    this.red.init(diff);
                }
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 生成中奖金额
     * @author: table
     */
    get getMoney(): string[] {
        let winning: string[] = [];
        for (let i = 0; i < this.swiperNum; i++) {
            let rad = (Math.random() * 5 + 10).toFixed(2);
            winning.push(rad);
        }
        return winning;
    }

    /**
     * @description: 生成红包
     * @author: table
     */
    getRed(): void {
        if (this.redNum >= this.redMax) {
            return;
        }
        let width = Math.random() * 25 + 70;
        let img = Math.random() > 0.5 ? 1 : 2;
        let animate = Math.floor(Math.random() * 12);
        this.redPacket.push({width, img, animate});

        this.redNum++;
        setTimeout(() => {
            this.getRed();
        }, 4000 / this.redMax);
    }

    /**
     * @description: 拆红包
     * @author: table
     */
    grabRed(): void {
        //如未登录，返回首页
        if (!this.auth.isAuth) {
            this.message.error('请登录');
            return;
        }
        const id = this.message.loading('红包拆开中...', {nzDuration: 0}).messageId;
        this.service.grabRed().subscribe((res: ResponseBody) => {
            this.message.remove(id);
            if (res.status === 10000) {
                this.redMoney = res.data.luckMoney;
                this.message.success(res.msg);
            } else {
                this.message.error(res.msg);
            }
        });
    }
}
