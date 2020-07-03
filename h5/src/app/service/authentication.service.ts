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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public reviving: boolean = false;
  public revivingPhone: string = '';
  public revivingName: string = '';
  public isGoHome: boolean = false;
  public indicated: boolean = false;

  constructor(
    public request: Request, public config: ConfigService,
    public message: NzMessageService, public router: Router,
    public user: UserService, public storage: StorageService,
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
        this.loginAfter(res, false);
      })
    );
  }


  /**
   * 登录、注册后续操作
   * @param resp
   */
  loginAfter(resp: ResponseBody, positive: boolean): void {
    if (resp.status === 10000) {
      this.atyService.initShowState();
      this.storage.setItem('token', resp.data.token);
      this.user.getUserInfo().subscribe();
      if (positive) {
        //  控制修改页面 返回跳转到首页
        sessionStorage.setItem('GoHomeKey', JSON.stringify({
          'isGoHome': true
        }));
        this.message.success(resp.msg, {nzDuration: 500})
          .onClose.subscribe(() => this.router.navigate(['/m/user/modify-password']));
      } else {
        //控制激活客户跳转到修改页面 提示框的显示隐藏
        sessionStorage.setItem('indicatedKey', JSON.stringify({
          'indicated': false
        }));
        //清空激活用户的手机号码
        this.revivingPhone = '';
        this.message.success(resp.msg, {nzDuration: 500})
          .onClose.subscribe(() => this.router.navigate(['/m/home']));
      }
      /*//调用刮刮乐活动
      this.atyService.scratchInit();*/
    } else if (resp.status === 30001) {
      // 激活账号
      if (resp.data.mobile) {
        this.revivingPhone = resp.data.mobile;
        this.revivingName = resp.data.username;
      } else {
        this.revivingPhone = '';
      }
      this.reviving = true;

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
    let recommendCode = sessionStorage.getItem('proxyName') || '';
    let params: AccountReg = Object.assign(values, {repassword: values.password, recommendCode});
    return this.request.post('unauthor/gateway/account/register', params).pipe(
      tap((res: ResponseBody) => {
        this.loginAfter(res, false);
      })
    );
  }

  /**
   * 手机登录
   * @param values
   * @return {Observable<ResponseBody>}
   */
  phoneLogin(values: MobileReg): Observable<ResponseBody> {
    return this.request.post('unauthor/gateway/mobile/login', values).pipe(
      tap((res: ResponseBody) => {
        this.loginAfter(res, false);
      })
    );
  }

  /**
   * 激活手机登录
   * @param values
   * @return {Observable<ResponseBody>}
   */
  revivingLogin(values: MobileReg): Observable<ResponseBody> {
    return this.request.post('unauthor/gateway/mobile/active', values).pipe(
      tap((res: ResponseBody) => {
        this.loginAfter(res, true);
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
   * 手机注册
   * @param values
   * @return {Observable<ResponseBody>}
   */
  mobileRegister(values: MobileReg): Observable<ResponseBody> {
    let recommendCode = sessionStorage.getItem('proxyName') || '';
    return this.request.post('unauthor/gateway/mobile/register', {...values, recommendCode}).pipe(
      tap((res: ResponseBody) => {
        this.loginAfter(res, false);
      })
    );
  }

  /**
   * 移除权限
   */
  removeAuthentication(url?): void {
    this.storage.removeItem('token');
    sessionStorage.removeItem('proxyName');
    this.router.navigateByUrl('/m/home');
  }


  /**
   * 退出
   * @ return {Observable<any>}
   */
  logout(): void {
    this.request.post('gateway/logout')
      .subscribe((resp: ResponseBody) => {
        if (resp.status === 10000) {
          //退出  清空修改密码页面激活客户控制提示框的显示和后退返回首页的数据  关闭登录页面激活页面的弹出框
          this.reviving = false;
          sessionStorage.removeItem('GoHomeKey');
          sessionStorage.removeItem('indicatedKey');
          this.message.success(resp.msg);
          this.removeAuthentication();
        } else {
          this.message.error(resp.msg);
        }
      });
  }

}
