import { Injectable } from '@angular/core';
import { Request } from '@src/app/http/request';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { ResponseBody, ScratchParams} from '@src/app/types/common.type';
import {Observable} from 'rxjs';
import {StorageService} from "@service/storage.service";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    /**
     * 红包活动数据
     */
    //小红包显示隐藏
    redSmall: boolean = false;

    /**
     * 刮刮乐活动数据
     */
    //大刮刮乐显示隐藏
    scratchBig: boolean = false;
    //小刮刮乐显示隐藏
    scratchSmall: boolean = false;
    //数据
    scratchData: any = {
        activityId: 0,
        userMoney: '',
        userPhone: '',
        verifyPhone: false,
    };

    /**
     * 大转盘数据
     */
    //中奖名单
    discWinning: any[] = [];
    //领取记录
    discRecive: any[] = [];
    //数据
    discData: any = {};


    constructor(
        public http: Request,
        public message: NzMessageService,
        public storage: StorageService,
    ) {
    }


    /**
     * @description: 调用红包活动
     * @author: table
     */
    redPackInit(): void {
        this.getRedStatus().subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                const { status } = res.data;
                if (status === 'success' || status === 'waiting') {
                    // 显示小红包
                  this.redSmall = true;
                }
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 获取红包状态
     * @author: table
     * @return: Observable
     */
    getRedStatus(): Observable<ResponseBody> {
        return this.http.get('unauthor/luckdraw/status');
    }

    /**
     * @description: 抢红包
     * @author: table
     * @return: Observable
     */
    grabRed(): Observable<any> {
        return this.http.post('luckdraw/prize');
    }

    /**
     * @description: 调用刮刮乐活动
     * @author: table
     */
    scratchInit(): void {
      this.getReward().subscribe((res: ResponseBody) => {
        if (res.status !== 10000) {
          return;
        }
        //大小显示
        if (this.storage.getItem('scratchShow') === 'false') {
          this.scratchSmall = true;
          this.scratchBig = false;
        } else {
          this.scratchSmall = false;
          this.scratchBig = true;
        }
        //赋值
        const data = res.data;
        this.scratchData.activityId = data.activityId;
        this.scratchData.userMoney = data.usermoney;
        this.scratchData.verifyPhone = data.verifyPhone;
        this.scratchData.userPhone = data.phoneNo;
      });
    }

    /**
     * @description: 获取刮刮乐活动信息
     * @author: table
     * @return: Observable
     */
    getReward(): Observable<ResponseBody> {
        return this.http.get('activity/guaguale/status');
    }

    /**
     * @description: 领取刮刮乐金额
     * @author: table
     * @param params
     * @return: Observable
     */
    receiveReward(params: ScratchParams): Observable<ResponseBody> {
        return this.http.get('activity/guaguale/prize', params);
    }


    /**
     * @description: 调用大转盘活动
     * @author: table
     */
    discInit(): void {
        //中奖名单
        this.getDiscWining().subscribe();
        //用户中奖信息
        this.getDiscRecive().subscribe();
        //转盘奖品
        this.getDiscList().subscribe();
    }

    /**
     * @description: 大转盘-获取中奖名单
     * @author: table
     */
    getDiscWining(): Observable<any> {
        return this.http.get('gglActivity/getRouletteActivityRecord').pipe(
            map(res => {
                if (res.status === 10000) {
                    this.discWinning = res.data;
                } else {
                    this.message.error(res.msg);
                }
            })
        );
    }

    getMobileDiscWining(): Observable<any> {
        return this.http.get('gglActivity/getRouletteActivityRecord');
    }

    /**
     * @description: 大转盘-获取用户中奖信息
     * @author: table
     */
    getDiscRecive(): Observable<any> {
        return this.http.get('gglActivity/currentRouletteActivityRecord').pipe(
            map(res => {
                if (res.status === 10000) {
                    this.discRecive = res.data;
                } else {
                    this.message.error(res.msg);
                }
            })
        );
    }

    /**
     * @description: 获取转盘活动奖品详情
     * @author: table
     */
    getDiscList(): Observable<any> {
        return this.http.get('gglActivity/getRoulettePrizes').pipe(
            map(res => {
                if (res.status === 10000) {
                    this.discData = res.data;
                } else {
                    this.message.error(res.msg);
                }
            })
        );
    }

    /**
     * @description: 大转盘-开始抽奖
     * @author: table
     */
    discLottery(): Observable<ResponseBody> {
        return this.http.get('gglActivity/getRouletteResult');
    }


}



