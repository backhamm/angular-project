import {Injectable} from '@angular/core';
import {ConfigService} from '@src/app/config/config.service';
import {Request} from '@src/app/http/request';
import {Observable} from 'rxjs';
import {ResponseBody, WebComConfig} from '@src/app/types/common.type';


@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    constructor(
        public config: ConfigService,
        public request: Request
    ) {
        this.getWebComConfig();
        this.getWebcomContact();
    }

    // 平台配置相关, 动态返回
    public webComConfig: Array<WebComConfig> = [];

    // 客服
    public webComContact: Array<any> = [];

    /**
     * 获取平台数据
     * @param {string} type PC端 类型 1=轮播图 2=logo 3=左图片 4=右图片 5=首页公告
     * @return {Observable<ResponseBody>}
     */
    getWebComConfig(): void {
        this.request.get('unauthor/webcom/config').subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.webComConfig = res.data;
            }
        }, error => console.log(error));
    }

    /**
     * 获取网站联系方式 联系方式类型：1-在线客服, 2-QQ, 3-微信, 4-邮箱, 5-钉钉，6-手机号, 7-qq公众号, 8-SKYPE, 9-备用客服系统, 10-客服闲聊, 11-代理闲聊, 12-代理QQ  13VIP通道  14投诉通道 15代理专员
     */
    getWebcomContact(): void {
        this.request.get('unauthor/webcom/contact').subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.webComContact = res.data;
            }
        }, error => console.log(error));
    }

    /**
     * 获取在线客服
     */
    get onlineService(): { href: string, target: string } {
        const data = this.webComContact.filter(item => item.type === 1);
        let info = { href: 'javascript:void(0);', target: ''};
        if (data.length && !!data[0].isjump) {
          info = Object.assign(info, { href: data[0].href, target: '_blank' });
        }
        return info;
    }
     /**
     * 获取代理专员
     */
    get agencyService(): { href: string, target: string } {
      const data = this.webComContact.filter(item => item.type === 15);
      let info = { href: 'javascript:void(0);', target: ''};
      if (data.length && !!data[0].isjump) {
        info = Object.assign(info, { href: data[0].href, target: '_blank' });
      }
      return info;
  }
    /**
     * 获取 qq号
     */
    get qqService(): { value: string, href: string, target: string } {
        const data = this.webComContact.filter(item => item.type === 2);
        let info = { value: '', href: 'javascript:void(0);', target: ''};
        if (data.length && !!data[0].value) {
          info = Object.assign(info, { value: data[0].value });
          if (!!data[0].isjump) {
            info = Object.assign(info, {
              href: `http://wpa.qq.com/msgrd?v=3&uin=${data[0].value}&site=qq&menu=yes`,
              target: '_blank'
            });
          }
        }
        return info;
    }

  /**
   * 获取 邮箱
   */
  get emailValue(): string {
    const data = this.webComContact.filter(item => item.type === 4);
    return data.length && data[0].value || '';
  }

  /**
   * 获取 电话号码
   */
  get phoneValue(): string {
    const data = this.webComContact.filter(item => item.type === 6);
    return data.length && data[0].value || '';
  }
}

