import {Injectable} from '@angular/core';
import {Request} from '@src/app/http/request';
import {ConfigService} from '@src/app/config/config.service';
import {Observable, Subject} from 'rxjs';
import {NzMessageService} from "ng-zorro-antd";
import {CommonService} from "@service/common.service";
import {OnlineBanking, ResponseBody, ScanPay} from '@src/app/types/common.type';
import {AuthenticationService} from '@service/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class DepositService {
    // 支付loading
    public isSpinning: boolean = false;

    // 当前支付渠道的所有信息
    public paymentPayer: any = {};

    // 当前支付商的索引
    public payIndex: any = 0;

    // 当前步骤 PC
    public currentStep = 0;

    constructor(
        public request: Request,
        public config: ConfigService,
        public common: CommonService,
        public message: NzMessageService,
        public auth: AuthenticationService) {

    }

    /**
     * @author Merlin
     * @date 2019/7/14
     * @Description: 切换支付商设置是否是固额，以及设置payId，初始化固定限额索引值,所有支付通用
     * @param i 切换active状态样式
     * @return: void
     */
    dealPayment(i: number) {
        const payInfo = this.paymentPayer.config[i];
        // 修改支付商active状态
        this.payIndex = i;
        // 设定页面title
        // this.common.commonRouteTitle = payInfo.scanname;
        this.common.commonRouteTitle = '存款';

    }
    /**
     *  * @author Merlin
     * @date 2019/7/12
     * @Description:获取支付列表信息
     * @param type: pc 0, h5 1
     * @return {Observable<ResponseBody>}
     */
    getPayConfig(): Observable<ResponseBody> {
        return this.request.get('pay/config');
    }

    // 线上支付 支付宝，微信，快捷，财付通，云闪付，京东, 支付公共处理公共复用
    scanPay(params: ScanPay): Observable<ResponseBody> {
        return this.request.post('pay/online/scan', params);
    }

    // 线上网银
    onlineBanking(params: OnlineBanking): Observable<ResponseBody> {
        return this.request.post('pay/online/banking', params);
    }

    // 线下银行汇款
    outlineBankPay(params: any): Observable<ResponseBody> {
        return this.request.post('pay/offline/remittance/order', params);
    }

    // 扫码提交订单
    qrCodeOrder(params: any): Observable<ResponseBody> {
        return this.request.post('pay/offline/scanPay', params);
    }

}

