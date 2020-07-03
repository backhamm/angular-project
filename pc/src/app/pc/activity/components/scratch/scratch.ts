import { Injectable } from '@angular/core';
import { ActivityService } from '@service/activity.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ConfigService } from '@src/app/config/config.service';
import {Validate} from '@src/app/util/validate';
import {ResponseBody} from "@src/app/types/common.type";
import {StorageService} from "@service/storage.service";
import {AuthenticationService} from "@service/authentication.service";

@Injectable({
    providedIn: 'root'
})

export class Scratch {
    //活动步骤
    step: number = -1;
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
    leaveTime: number = 10;
    // 防止多次点击提交
    submitBtnOnOff = true;

    constructor(
        public service: ActivityService,
        public message: NzMessageService,
        public storage: StorageService,
        public config: ConfigService,
        public validate: Validate,
        public auth: AuthenticationService
    ) { }

    /**
     * @description: canvas
     * @author: table
     */
    canvasInt(canvas: any): void {
        this.cWidth = canvas.width;
        this.cHeight = canvas.height;
        const ctx = canvas.getContext('2d');
        //绘制背景
        ctx.fillStyle = "#aaa";
        ctx.fillRect(0, 0, this.cWidth, this.cHeight);
        this.drawText(ctx);

        this.bindEvent(canvas, ctx);
    }

    /**
     * @description: 绘制'开始刮奖'
     * @author: table
     * @param ctx 画笔
     */
    drawText(ctx: any): void {
        //绘制文字
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = "#808080";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // ctx.fillRect(0, 0, 255.2, 143.2);
        ctx.fillText("开始刮奖", this.cWidth / 2, this.cHeight / 2);
        //设置绘制状态
        ctx.lineCap = "round";　　 //设置线条两端为圆弧
        ctx.lineJoin = "round";　　 //设置线条转折为圆弧
        ctx.lineWidth = 40;
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
    bindEvent(cav: any, ctx: any): void {
        let startX = 0;
        let startY = 0;
        let flag = false;
        cav.onmousedown = (e: any) => {
            startX = e.offsetX;
            startY = e.offsetY;
            flag = true;
        };

        cav.onmousemove = (e: any) => {
            if (!flag) {
                return;
            }
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.closePath();
            //更新坐标
            startX = e.offsetX;
            startY = e.offsetY;
        };

        document.onmouseup = (e: any) => {
            if (!flag) {
              return;
            }
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
        if (area > this.cWidth * this.cHeight * 0.4) {
            ctx.clearRect(0, 0, this.cWidth, this.cHeight);
            this.step = 1;
        }
    }

    /**
     * @description: 领取彩金
     * @author: table
     */
    getLottery(): void {
        //手机未验证
        if (!this.service.scratchData.verifyPhone) {
            this.step = 2;
            return;
        }

        this.senMoney();
    }

    /**
     * @description: 确定
     * @author: table
     */
    sure(): void {
        if (!this.submitBtnOnOff) {
          this.message.info('请求中，请稍后...');
        }
        this.submitBtnOnOff = false;
        //验证手机号
        if (!this.validate.singleValidateFn('mobile', this.service.scratchData.userPhone)) {
          return;
        }
        if (this.msgCode.length !== 4 || !Number(this.msgCode)) {
          this.message.error('请输入正确验证码');
          return;
        }
        this.senMoney();
    }

    /**
     * @description: 保存彩金
     * @author: table
     */
    senMoney(): void {
        let params = {
            aid: this.service.scratchData.activityId.toString(),
            mobile: '',
            msgCode: ''
        };
        //未验证
        if (!this.service.scratchData.verifyPhone) {
            Object.assign(params, {
                mobile: this.service.scratchData.userPhone,
                msgCode: this.msgCode
            });
        }
        this.service.receiveReward(params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                //领取成功
                this.service.scratchBig = false;
                this.service.scratchSmall = false;
            }
            this.message.info(res.msg);
        }, error => console.log(error), () => this.submitBtnOnOff = true);
    }

    /**
     * @description: 大刮刮乐关闭事件
     * @author: table
     */
    closeScratch(): void {
        this.service.scratchBig = false;
        this.service.scratchSmall = true;
        this.storage.setItem('scratchShow', 'false');
    }

    /**
     * @description: 发送手机验证码
     * @author: table
     */
    senMsgCode(): void {
        let params = {
          mobileNo: this.service.scratchData.userPhone,
          type: 4
        };
        //验证手机号
        if (!this.validate.singleValidateFn('mobile', params.mobileNo)) {
            return;
        }
        this.msgLoading = true;
        this.auth.getMsgCode(params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                //倒计时
                this.leaveShow = true;
                this.countTime();
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
