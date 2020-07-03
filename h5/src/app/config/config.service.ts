import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export const config = {
  "platform": {
    "title": "太阳城",
    "AGENT": "TYXB",
    "PLATFORM_IDENTITY": "TYXB",
    // "BASE_IMG_MOBILE_URL": "//192.168.106.140:82/Project_3.0/mobileTYXC/",
    "BASE_IMG_MOBILE_URL": "//mobile.beike188.com/mobileTYXC/",
    "DOWN_LOAD_APP": "https://www.load-code.com/2code_php/jump.html?id=231",
    "DOWN_LOAD_APP_SPARE": "http://tx-down.com/tyxc/index.html"
  }
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly config;
  private hostname = window.location.host;
  private protocol = window.location.protocol;

  private AGENT;    // 代理号

  constructor(public httpClient: HttpClient) {
    this.config = config;
    // 根据json修改页面title
    this.setPageTitle();
  }

  /**
   * 获取代理号
   */
  get agent(): string {
    const AGENT = this.config.platform.AGENT;
    return document.location.host.slice(0, 7) === 'uat.txbet' ? 'UAT' : AGENT;
  }

  /**
   * 获取配置
   */
  getConfig() {
    return this.config;
  }

  /**
   * 返回平台名称
   */
  get platformName(): string {
    return this.config.platform.title;
  }

  /**
   * 获取h5网站图片链接
   */
  get baseMobileImgUrl(): string {
    return this.config.platform.BASE_IMG_MOBILE_URL;
  }

  /**
   * app下载链接链接
   */
  get downloadAppUrl(): string {
    return this.config.platform.DOWN_LOAD_APP;
  }

  /**
   * app备用下载链接
   */
  get downloadAppSpare(): string {
    return this.config.platform.DOWN_LOAD_APP_SPARE;
  }

  /**
   * 获取网站标识
   */
  get identity() {
    return this.config.platform.PLATFORM_IDENTITY;
  }

  isDevelopment(): boolean {
    const hostname = this.hostname;
    return (
      hostname.indexOf('192.168') > -1 || hostname.indexOf('localhost') > -1 || hostname.indexOf('127.0.0.1') > -1
    );
  }

  get requestUrl(): string {
    return this.protocol + '//' + this.hostname + '/api/';
  }

  setPageTitle() {
    document.getElementsByTagName("title")[0].innerText = this.config.platform.title;
  }

}
