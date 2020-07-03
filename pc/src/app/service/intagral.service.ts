import {Injectable} from '@angular/core';
import {Request} from '@src/app/http/request';
import {Observable} from 'rxjs';
import {ExchangeParams, GoodsParams, IntegralRecodParams, ResponseBody, ResponseList} from '@src/app/types/common.type';
import {leftData} from "@src/app/util/text";

@Injectable({
    providedIn: 'root'
})

export class IntagralService {
    //左侧滚动数据
    public leftData: Object[] = leftData;

    constructor(
        public request: Request,
    ) {
    }

    /**
     * @description: 获取人气推荐商品
     * @author: table
     * @param {object} params
     * @return {Observable<ResponseBody>}
     */
    getHotGood(): Observable<ResponseBody> {
        return this.request.get('unauthor/mail/goods/ranks');
    }

    /**
     * @description: 请求列表数据
     * @author: table
     * @param {object} params
     * @return {Observable<ResponseBody>}
     */
    getGoods(params: GoodsParams): Observable<ResponseList> {
        return this.request.get('unauthor/mail/goods/list', params);
    }

    /**
     * @description: 兑换商品
     * @author: table
     * @param {object} params
     * @return {Observable<ResponseBody>}
     */
    exchangeGood(params: ExchangeParams): Observable<ResponseBody> {
        return this.request.post('mail/order/create', params);
    }

    /**
     * @description: 订单记录
     * @author: zeal
     * @param {object} params
     * @return {Observable<ResponseBody>}
     */
    getIntegralRecod(params: IntegralRecodParams): Observable<ResponseList> {
        return this.request.get('mail/order/list', params);
    }
}