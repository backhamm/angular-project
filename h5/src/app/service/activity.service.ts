import {Injectable} from '@angular/core';
import {Request} from '@src/app/http/request';
import {map} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {MsgCode, ResponseBody, ScratchParams} from '@src/app/types/common.type';
import {Observable} from 'rxjs';
import {StorageService} from "@service/storage.service";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
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
    //领取记录
    discRecive: any[] = [];
    //数据
    discData: any = {};
    hasCoupon: boolean = true;
	  activeCoupon: boolean = true;
    hasScavenger: boolean = true;


    constructor(
        public http: Request,
        public message: NzMessageService
    ) {
    }

    // 初始化红包刮刮乐显示状态
    initShowState() {
      this.hasCoupon = true;
      this.hasScavenger = true;
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
     * @description: 发送手机验证码
     * @author: table
     * @param params
     * @return: Observable
     */
    sendMsgCode(params: MsgCode): Observable<ResponseBody> {
        return this.http.post('unauthor/sms/code', params);
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



