import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivityService } from '@service/activity.service';
import { NzMessageService } from 'ng-zorro-antd';
import {ResponseBody} from "@src/app/types/common.type";

@Component({
    selector: 'app-turntable',
    templateUrl: './turntable.component.html',
    styleUrls: ['./turntable.component.less']
})
export class TurntableComponent implements OnInit {
    //防止重复点击抽奖
    public isDoing: boolean = false;
    //转盘
    public discBox: any;
    //记录旋转角度
    public oldDeg: number = 0;
    //显示中奖礼品 -1隐藏 0 中奖 1未中奖
    show: number = -1;
    //中奖类型
    prizeType: number = -1;
    //中奖名称
    prizeName: string;

    constructor(
        public el: ElementRef,
        public service: ActivityService,
        public message: NzMessageService,
    ) { }

    ngOnInit() {
        //调用活动
        this.service.discInit();
        if (this.service.discData.remainingCount > 0) {
            this.isDoing = true;
        }
        //获取转盘
        this.discBox = this.el.nativeElement.querySelector('#discBox');
    }

    /**
     * @description: 开始抽奖
     * @author: table
     */
    doLottery(): void {
        if (!this.isDoing) {
            return;
        }
        this.isDoing = false;
        this.service.discLottery().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                const data = res.data;
                //赋值
                this.prizeType = data.prizeType;
                this.prizeName = data.prizeName;
                let deg = data.prizeLevel;
                //旋转
                this.resetRotate(deg);
                this.oldDeg = deg;
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 旋转完成，显示中奖礼品
     * @author: table
     */
    showGift(): void {
        this.isDoing = true;
        this.service.discInit();
        if (this.prizeType === 2) {
            this.show = 1;
        } else {
            this.show = 0;
        }
    }

    /**
     * @description: 隐藏礼品展示框
     * @author: table
     */
    hideLottery(): void {
        this.show = -1;
        this.prizeType = -1;
        this.prizeName = '';
    }

    /**
     * @description: 旋转转盘
     * @author: table
     * @param deg 旋转角度
     */
    rotate(deg: number = 0): void {
        deg += 1800;
        const PI = Math.PI;
        let radian = 0; //弧度
        let oneStep = 1.5; //单次移动度数
        let oneTime = 10; //单次移动时间
        let n = deg / oneStep; //移动次数
        let oneRadian = PI / (2 * n); //单次增加弧度

        let timer = setInterval(() => {
            this.rotateOne(Math.sin(radian) * deg);
            radian += oneRadian;
            //旋转停止
            if (radian > PI / 2) {
                clearInterval(timer);
                this.rotateOne(deg % 360);
                //显示抽奖结果
                this.showGift();
            }
        }, oneTime);
    }

    /**
     * @description: 旋转一步
     * @author: table
     * @param deg 旋转角度
     */
    rotateOne(deg: number = 0): void {
        this.discBox.style.transform = 'rotate(' + deg + 'deg)';
    }

    /**
     * @description: 重置转盘旋转回到0度
     * @author: table
     * @param deg 重置后旋转角度
     * @return:
     */
    resetRotate(deg: number = 0): void {
        let oneStep = 2; //单次移动度数
        let oneTime = 10; //单次移动时间

        if (this.oldDeg % 360 === 0) {
            this.rotate(deg);
        } else {
            let timer = setInterval(() => {
                this.oldDeg += oneStep;
                this.rotateOne(this.oldDeg);
                if (this.oldDeg >= 360) {
                    clearInterval(timer);
                    this.rotate(deg);
                }
            }, oneTime);
        }
    }
}
