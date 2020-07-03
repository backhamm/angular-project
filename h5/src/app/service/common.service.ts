import {Injectable} from '@angular/core';
import {Request} from '@src/app/http/request';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ResponseBody} from '@src/app/types/common.type';
import {StorageService} from "@service/storage.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public request: Request, public router: Router, private storage: StorageService) {
  }

  // 公共title的设置 只在h5页面中
  public commonRouteTitle = '';

  /**
   *  代理,推广链接识别
   */
  public proxy: string;

  get proxyName(): string {
    return this.proxy || sessionStorage.getItem('proxyName');
  }

  /**
   *  全局控制loading
   */
  loading: boolean = false;

  /**
   * 获取网站联系方式
   */
  getCustomer(): Observable<ResponseBody> {
    return this.request.get('unauthor/webcom/contact');
  }


  /**
   * 获取平台信息
   * @param value  1=轮播图 2=logo 3=左图片 4=右图片 5=首页公告
   * @ return {Observable<ResponseBody>}
   */
  getWebcom(): Observable<ResponseBody> {
    return this.request.get('unauthor/webcom/config');
  }

  /**
   * 获取代理
   * @ return {string}
   */
  initProxy(): void {
    let url = location.search.substr(1);
    let args = {};
    let items = url.length ? url.split('&') : [];
    for (let i = 0; i < items.length; i++) {
      let argsArr = items[i].split('=');
      let length = argsArr[0].toString().length;
      //防止多个=号
      args[argsArr[0].toString()] = items[i].slice(length + 1);
    }
    // 如果P不为空 => 跳转至注册页
    if (args['p']) {
      this.proxy = args['p'];
      sessionStorage.setItem('proxyName', this.proxy);
      this.router.navigateByUrl('/register');
    }
  }
}

