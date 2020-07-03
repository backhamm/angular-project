import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigService} from '../config/config.service';
import {Request} from '../http/request';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {AccountReg, MobileReg, ResponseBody} from '../types/common.type';
import {UserService} from '@service/user.service';
import {ActivityService} from '@service/activity.service';
import {StorageService} from "@service/storage.service";
import {CommonService} from "@service/common.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    //验证弹窗
    public activeLogin = false;

    public phoneLogin = false;
    public errorLogin = false;
    
    public passwordInfo = false;
    public loginData ={
        mobile:'',
        username:''
    }
    constructor(
        public request: Request, public config: ConfigService,
        public message: NzMessageService, public router: Router,
        public user: UserService, public storage: StorageService,
        public common: CommonService,
        public atyService: ActivityService
    ) {
    }

    /**
     * 是否已登录
     * @ return {boolean}
     */
    get isAuth(): boolean {
        return !!this.storage.getItem('token');
    }

    /**
     * 登录
     * @ param value
     * @ return {Observable<ResponseBody>}
     */
    login(value): Observable<ResponseBody> {
        return this.request.post('unauthor/gateway/account/login', value).pipe(
            tap((res: ResponseBody) => {
                if (res.status == 30001) {
                    this.activeLogin = true;
                    this.common.loginModalVisible = this.phoneLogin = this.errorLogin = this.passwordInfo = false;
                    if(res.data.mobile){
                        this.loginData = res.data
                        this.phoneLogin = true
                    }else{
                      this.errorLogin = true;   
                    } 
                } else {
                    this.loginAfter(res);
                }
    
            })
        );
    }


    /**
     * 登录、注册后续操作
     * @param resp
     */
    loginAfter(resp: ResponseBody,value?:string): void {
        if (resp.status === 10000) {
            this.common.loginModalVisible = false;
            this.message.success(resp.msg);
            this.storage.setItem('token', resp.data.token);
            this.user.getUserInfo().subscribe();
            value?this.router.navigateByUrl('/center/modify_password?id='+ value) : this.router.navigateByUrl('/home') ;
            //调用刮刮乐活动
            this.atyService.scratchInit();
        } else {
            this.message.error(resp.msg);
        }
    }


    /**
     * 快速注册
     * @param {User} values
     * @return {Observable<ResponseBody>}
     */
    quickRegister(values): Observable<ResponseBody> {
        let params: AccountReg = Object.assign(values, {repassword: values.password});
        return this.request.post('unauthor/gateway/account/register', params).pipe(
            tap((res: ResponseBody) => {
                this.loginAfter(res);
            })
        );
    }

    /**
     * 发送短信验证码 1-注册验证 2-更换手机号 3-登录验证 4-绑定手机验证
     * @return {Observable<ResponseBody>}
     */
    getMsgCode(params): Observable<ResponseBody> {
        return this.request.post('unauthor/sms/code', params);
    }

    /**
     * 客服迁移
     * @param value
     */
    userActiveLogin(value):Observable<ResponseBody>{
        return this.request.post('unauthor/gateway/mobile/active', value);
    }

    /**
     * 手机注册
     * @param values
     * @return {Observable<ResponseBody>}
     */
    mobileRegister(values: MobileReg): Observable<ResponseBody> {
        return this.request.post('unauthor/gateway/mobile/register', values).pipe(
            tap((res: ResponseBody) => {
                this.loginAfter(res);
            })
        );
    }

    /**
     * 移除权限
     */
    removeAuthentication(url?): void {
        this.storage.removeItem('token');
        sessionStorage.removeItem('proxyName');
        this.router.navigateByUrl(url || '/home');
    }


    /**
     * 退出
     * @ return {Observable<any>}
     */
    logout(): void {
        this.request.post('gateway/logout')
        .subscribe((resp: ResponseBody) => {
            if (resp.status === 10000) {
                this.message.success(resp.msg);
                this.removeAuthentication();
            } else {
                this.message.error(resp.msg);
            }
        });
    }

}
