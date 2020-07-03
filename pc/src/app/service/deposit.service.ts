import {Injectable} from '@angular/core';
import {Request} from '@src/app/http/request';
import {ConfigService} from '@src/app/config/config.service';
import {Observable, Subject} from 'rxjs';
import {NzMessageService} from "ng-zorro-antd";
import {CommonService} from "@service/common.service";
import {ResponseBody, ScanPay} from '@src/app/types/common.type';
import {AuthenticationService} from '@service/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class DepositService {

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
        public auth: AuthenticationService) { }

    /**
     * @author Merlin
     * @date 2019/7/12
     * @Description:获取支付列表信息
     * @return {Observable<ResponseBody>}
     */
    getPayConfig(): Observable<ResponseBody> {
        return this.request.get('pay/config');
    }

    // 线上支付 => 网银支付，支付宝，微信，快捷，财付通，云闪付，京东 等
    onlinePay(params: ScanPay): Observable<ResponseBody> {
      const url = params.scancode === 'wy' ? 'pay/online/banking' : 'pay/online/scan';
      return this.request.post(url, params);
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

