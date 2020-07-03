import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {NzNotificationService} from 'ng-zorro-antd';
import {ConfigService} from '../config/config.service';
import {AuthenticationService} from '@service/authentication.service';
import {StorageService} from "@service/storage.service";


@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    public notification: NzNotificationService,
    public auth: AuthenticationService,
    private storage: StorageService,
    public config: ConfigService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // 请求前置处理
    const token = this.storage.getItem('token') || '';
    const modifyReq = request.clone(
      {
        url: this.config.requestUrl + request.url,
        headers: new HttpHeaders({'authorization': token})
      });
    return next.handle(modifyReq).pipe(
      tap(event => {
          // 请求后置处理
          if (event instanceof HttpResponse) {
            const resp = event.body;
            const curToken = event.headers.get('authorization');
            curToken && this.storage.setItem('token', curToken);
            // 登录超时 和 失效的情况
            if (resp.status === 20004 || resp.status === -10000) {
              this.auth.removeAuthentication();
            }
            
          }
        }, error => {
          // 请求异常处理
          const {status} = error;
          this.notification.blank(
            '系统提示',
            `网络异常，错误码：${status}`
          );
        }
      )
    );
  }
}


