import {Injectable} from '@angular/core';
import {ConfigService} from '@src/app/config/config.service';
import {Request} from '@src/app/http/request';
import {Observable, Subject} from 'rxjs';
import {ResponseBody, WebComConfig} from '@src/app/types/common.type';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(
    public config: ConfigService,
    public request: Request) {
    this.getWebComConfig();
    this.getWebcomContact();
  }

  // 平台配置相关, 动态返回
  public webComConfig: Array<WebComConfig> = [];

  public discountList = [];

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
        let list = res.data.filter(item => Number(item.type) === 4)[0];
        if (list) {
          this.discountList = list.configs;
        }
      }
    }, error => console.log(error));
  }

  /**
   * 获取网站联系方式 联系方式类型：1-在线客服, 2-QQ, 3-微信, 4-邮箱, 5-钉钉，6-手机号, 7-qq公众号, 8-SKYPE, 9-备用客服系统, 10-客服闲聊, 11-代理闲聊, 12-代理QQ
   */
  getWebcomContact(): void {
    this.request.get('unauthor/webcom/contact').subscribe((res: ResponseBody) => {
      if (res.status === 10000) {
        this.webComContact = res.data;
      }
    }, error => console.log(error));
  }


  getNotice() {
    return this.request.get('gonggao.do',
      {
        cagent: this.config.agent,
        src: this.config.identity,
      });
  }

  /**
   * 获取在线客服
   */
  get onlineService(): string {
    const data = this.webComContact.filter(item => item.type === 1);
    return (data.length && data[0].isjump && data[0].href) || 'javascript:void(0);';
  }

  get dailiService(): string {
    const data = this.webComContact.filter(item => item.type === 15);
    return (data.length && data[0].isjump && data[0].href) || 'javascript:void(0);';
  }
 /**
   * 获取在线小姐姐客服
   */
  get sisterService(): string {
    const data = this.webComContact.filter(item => item.type === 16);
    return (data.length && data[0].isjump && data[0].href) || 'javascript:void(0);';
  }

  /*
  * 获取客服小姐姐
  * */
  get kefuService(): string {
    const data = this.webComContact.filter(item => item.type === 16);
    return (data.length && data[0].isjump && data[0].href) || 'javascript:void(0);';
  }

  /**
   * 获取某一个联系方式：1-在线客服, 2-QQ, 3-微信, 4-邮箱, 5-钉钉，6-手机号, 7-qq公众号, 8-SKYPE, 9-备用客服系统, 10-客服闲聊, 11-代理闲聊, 12-代理QQ   16在线小姐姐
   */
  getContactVal(type: number): string {
    const data = this.webComContact.filter(item => item.type === type);
    return (data.length && data[0].value) || '';
  }

  //3-微信,4-邮箱,5-钉钉，6-手机号,7-qq公众号,8-SKYPE 非必传
  /*getContact(type: number): string {
      try {
          let contactData = this.webContactService(type);
          return contactData.value || '';
      } catch (e) {

      }

  }*/


}

