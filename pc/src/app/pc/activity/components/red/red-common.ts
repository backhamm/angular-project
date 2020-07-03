import { Injectable } from '@angular/core';
import { ConfigService } from "@src/app/config/config.service";

@Injectable({
    providedIn: 'root'
})

export class RedCommon {
    //倒计时时间 s
    public time: number = 0;
    //显示倒计时
    isWaiting: boolean = false;
    //显示抢红包
    isGoing: boolean = false;
    //剩余时间
    leaveTime: string[] = ['0', '0', '0', '0', '0', '0', '0'];
    //动画判断
    animate: any = [
        [false, false], //动画-天
        [false, false], //动画-时0
        [false, false], //动画-时1
        [false, false], //动画-分0
        [false, false], //动画-分1
        [false, false], //动画-秒0
        [false, false], //动画-秒1
    ];
    //数字图片
    redImage: string[] = [
        `${this.config.baseImgUrl}/hongbao/0.png`,
        `${this.config.baseImgUrl}/hongbao/1.png`,
        `${this.config.baseImgUrl}/hongbao/2.png`,
        `${this.config.baseImgUrl}/hongbao/3.png`,
        `${this.config.baseImgUrl}/hongbao/4.png`,
        `${this.config.baseImgUrl}/hongbao/5.png`,
        `${this.config.baseImgUrl}/hongbao/6.png`,
        `${this.config.baseImgUrl}/hongbao/7.png`,
        `${this.config.baseImgUrl}/hongbao/8.png`,
        `${this.config.baseImgUrl}/hongbao/9.png`
    ];

    constructor(
        public config: ConfigService
    ) {
    }

    init(time: number): void {
        if (time <= 0) {
            this.isGoing = true;
            return;
        }
        this.time = time;
        this.isWaiting = true;
        this.showTime();
    }
    /**
     * @description: 剩余时间转换为天时分秒
     * @author: table
     * @return: 天时分秒
     */
    get getSplitTime(): string {
        //天
        let day: string = Math.floor(this.time / (24 * 3600)).toString();
        //剩余小时
        let leaveHours: number = this.time % (24 * 3600);
        //小时
        let hours: string = ('00' + Math.floor(leaveHours / 3600)).slice(-2);
        //剩余分钟
        let leaveMinute: number = leaveHours % 3600;
        //分
        let minute: string = ('00' + Math.floor(leaveMinute / 60)).slice(-2);
        //剩余秒
        let second: string = ('00' + leaveMinute % 60).slice(-2);
        //下一秒
        this.time -= 1;

        return day + hours + minute + second;
    }
    /**
     * @description: 显示时间
     * @author: table
     */
    showTime(): any {
        if (this.time <= 0) {
            this.isWaiting = false;
            this.isGoing = true;
            return;
        }
        let timeArr: string = this.getSplitTime;
        //遍历判断是否发生动画
        Array.from(timeArr).forEach((time, i) => {
            if (time !== this.leaveTime[i]) {
                //动画-隐藏
                this.animate[i][0] = true; //隐藏上个时间
                this.animate[i][1] = false;
                //动画-显示
                setTimeout(() => {
                    this.leaveTime[i] = time;
                    this.animate[i][0] = false;
                    this.animate[i][1] = true; //显示当前时间
                }, 350);
            }
        });
        //定时器
        setTimeout(() => {
            this.showTime();
        }, 1000);
    }
}
