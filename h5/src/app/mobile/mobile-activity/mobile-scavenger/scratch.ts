import {Injectable} from '@angular/core';
import {ActivityService} from '@service/activity.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ConfigService} from '@src/app/config/config.service';
import {Validate} from "@src/app/util/validate";

@Injectable({
    providedIn: 'root'
})

export class Scratch {

    constructor(
        public service: ActivityService,
        public message: NzMessageService,
        public config: ConfigService,
        public validate: Validate
    ) {
    }

    //活动步骤
    step: number = 0;
    //画布宽
    cWidth: number = 0;
    //画布高
    cHeight: number = 0;
    //刮刮乐步骤显示文字
    scratchText = ['您有一次刮奖机会哦！', '您已刮中奖品！', '请留下联系方式！'];
    //短信验证码
    msgCode: string = '';
    //验证码loading
    msgLoading: boolean = false;
    //倒计时
    leaveShow: boolean = false;
    leaveTime: number = 60;

    // 刮刮乐活动返回信息
    scratchData: any;

    /**
     * @description: canvas
     * @author: table
     */
    canvasInt(canvas: any, top: number, left: number): void {
        this.cWidth = canvas.width;
        this.cHeight = canvas.height;
        const ctx = canvas.getContext('2d');
        //绘制背景
        ctx.fillStyle = "#aaa";
        ctx.fillRect(0, 0, this.cWidth, this.cHeight);
        this.drawText(ctx);

        this.bindEvent(canvas, ctx, top, left);
    }

    /**
     * @description: 绘制'开始刮奖'
     * @author: table
     * @param ctx 画笔
     */
    drawText(ctx: any): void {
        //绘制文字
        ctx.font = 'bold 30px Arial';
        ctx.fillStyle = "#808080";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // ctx.fillRect(0, 0, 255.2, 143.2);
        ctx.fillText("开始刮奖", this.cWidth / 2, this.cHeight / 2);
        //设置绘制状态
        ctx.lineCap = "round";　　 //设置线条两端为圆弧
        ctx.lineJoin = "round";　　 //设置线条转折为圆弧
        ctx.lineWidth = 20;
        /*设置新绘制清除新绘制内容和原内容的重叠区域*/
        ctx.globalCompositeOperation = "destination-out";
        this.step = 0;
    }

    /**
     * @description: 绑定canvas事件
     * @author: table
     * @param cav 画布
     * @param ctx 画笔
     * @return:
     */
    bindEvent(cav: any, ctx: any, top: number, left: number): void {
        let startX = 0;
        let startY = 0;
        let flag = false;
        cav.ontouchstart = (e: any) => {
            startX = e.touches[0].clientX - left;
            startY = e.touches[0].clientY - top;
            flag = true;
        };

        cav.ontouchmove = (e: any) => {
            // if (!flag) {
            //     return;
            // }
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(e.touches[0].clientX - left, e.touches[0].clientY - top);
            ctx.stroke();
            ctx.closePath();
            //更新坐标
            startX = e.touches[0].clientX - left;
            startY = e.touches[0].clientY - top;
        };

        cav.ontouchend = (e: any) => {
            flag = false;
            this.getArea(ctx);
        };
    }

    /**
     * @description: 计算刮掉面积
     * @author: table
     * @param ctx 画笔
     */
    getArea(ctx: any): void {
        let data = ctx.getImageData(0, 0, this.cWidth, this.cHeight).data;
        let area = 0;
        data.forEach((value: any) => {
            if (value === 0) {
                area++;
            }
        });
        if (area > this.cWidth * this.cHeight * 1.2) {
            ctx.clearRect(0, 0, this.cWidth, this.cHeight);
            this.step = 1;
        }
    }

    /**
     * @description: 确定
     * @author: table
     */
    sure(phone: string): void {
        const regParams = [
            {regName: 'mobile', val: phone},
            {regName: 'code', val: this.msgCode},
        ]

        //验证手机号、验证码
        if (!this.validate.mulValidateFn(regParams)) {
            return;
        }
        this.senMoney(phone);
    }

    /**
     * @description: 保存彩金
     * @author: table
     */
    senMoney(phone: string): void {
        let params = {
            terminal: '1',
            aid: this.scratchData.activityId.toString(),
            mobile: phone,
            msgCode: this.msgCode
        };
        //未验证
        if (!this.scratchData.verifyPhone) {
            Object.assign(params, {
                phoneNo: phone
            });
        }
        this.service.receiveReward(params).subscribe(res => {
            if (res.status === 10000) {
                this.service.hasScavenger = false;
            }
            this.message.info(res.msg);
        });
    }

    /**
     * @description: 发送手机验证码
     * @author: table
     */
    senMsgCode(phone: string): void {
        //验证手机号
        if (!this.validate.singleValidateFn('mobile', phone)) {
            return;
        }
        this.msgLoading = true;
        let params = {
            mobileNo: phone,
            type: 4
        };
        this.leaveShow = true;
        this.service.sendMsgCode(params).subscribe(res => {
            if (res.status === 10000) {
                //倒计时
                this.countTime();
            } else {
                this.leaveShow = false;
            }
            this.msgLoading = false;
            this.message.info(res.msg);
        });
    }

    /**
     * @description: 倒计时
     * @author: table
     */
    countTime(): void {
        if (this.leaveTime <= 1) {
            this.leaveShow = false;
            this.leaveTime = 60;
            return;
        }
        this.leaveTime--;

        setTimeout(() => {
            this.countTime();
        }, 1000);
    }

}
