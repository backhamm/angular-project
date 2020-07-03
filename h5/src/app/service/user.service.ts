import {Injectable} from '@angular/core';
import {ConfigService} from '@src/app/config/config.service';
import {Request} from '@src/app/http/request';
import {Observable} from 'rxjs';
import {CommonService} from './common.service';
import {tap} from "rxjs/internal/operators";
import {LoginPass, ResponseBody, ResponseList, UserInfo} from '@src/app/types/common.type';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        public request: Request, public config: ConfigService,
        public common: CommonService) {
    }

    /**
     * 用户相关信息
     */
    userInfo: UserInfo;

    get user(): any {
        return this.userInfo;
    }

    /**
     * 获取用户信息
     */
    getUserInfo(): Observable<any> {
        return this.request.get('user/info').pipe(
            tap(res => {
                if (res.status === 10000) {
                    this.userInfo = res.data;
                }
            })
        );
    }

    /**
     * 修改用户信息
     * @param values
     * @return {Observable<ResponseBody>}
     */
    changeUserInfo(values): Observable<ResponseBody> {
        return this.request.post('user/change/info', values);
    }

    /**
     * 修改密码
     * @param values
     * @return {Observable<ResponseBody>}
     */
    changePassword(values: LoginPass): Observable<ResponseBody> {
        return this.request.post('user/modify/login/password', values);
    }

    /**
     * 发送手机验证码
     * @param values
     * @return {Observable<ResponseBody>}
     */
    sendPhoneCode(values): Observable<ResponseBody> {
        return this.request.post('unauthor/sms/code', values);
    }

    /**
     * 更换手机号
     * @param values
     * @return {Observable<ResponseBody>}
     */
    changeUserPhone(params): Observable<ResponseBody> {
        return this.request.post('user/modify/login/mobile', params);
    }

    /**
     * 设置提款密码
     * @param values
     * @return {Observable<ResponseBody>}
     */
    changeQkpwd(params): Observable<ResponseBody> {
        return this.request.post('user/modify/withdraw/password', params);
    }

    /**
     * 获取用户是否设置提款密码
     * @param values
     * @return {Observable<ResponseBody>}
     */
    checkQkpwd(): Observable<ResponseBody> {
        return this.request.post('User/checkQkpwd');
    }

    /**
     * 获取用户是否绑定银行卡
     * @param values
     * @return {Observable<ResponseBody>}
     */

    getUserCard(): Observable<ResponseBody> {
        return this.request.get('bank/info');
    }

    // 银行卡选择类型
    getBankTypes(): Observable<ResponseBody> {
        return this.request.get('bank/types');
    }

    /**
     * 用户绑定银行卡
     * @param values
     * @return {Observable<ResponseBody>}
     */
    addUserCard(values): Observable<ResponseBody> {
        return this.request.post('bank/add', values);
    }

    /**
     * 获取银行卡信息
     */
    getBankCardInfo() {
        return this.request.get('bank/info');
    }

    /**
     * 获取站内消息列表
     * @param values
     * @return {Observable<ResponseBody>}
     */
    getMessageList(values): Observable<ResponseList> {
        return this.request.get('stand/letter/list', values);
    }

    /**
     * 获取站内未读消息数量
     * @param values
     * @return {Observable<ResponseBody>}
     */
    getMessageNum(values): Observable<ResponseBody> {
        return this.request.post('User/getMessageNum', values);
    }

    /**
     * 获取站内消息内容
     * @param values
     * @return {Observable<ResponseBody>}
     */
    getMessageInfo(values): Observable<ResponseBody> {
        return this.request.get('stand/letter/info', values);
    }
}

