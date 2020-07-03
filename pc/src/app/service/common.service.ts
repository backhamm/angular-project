import {Injectable} from '@angular/core';
import {Request} from '@src/app/http/request';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(
        public request: Request, public router: Router) {
    }

    /**
     *  代理,推广链接识别
     */
    public proxy: string;

    get proxyName(): string {
        return this.proxy || sessionStorage.getItem('proxyName');
    }

    /**
     *  登录弹窗是否显示
     */
    loginModalVisible = false;

    /**
     * 登录弹窗关闭隐藏
     */
    toggleLoginModal(): void {
        this.loginModalVisible = !this.loginModalVisible;
    }
    // 公告弹框数据
    noticeConfig: any = {
        content: '',
        show: false
    }
    noticeAlert(content: string) {
        if (!content) {
            return;
        }
        this.noticeConfig.show = true;
        this.noticeConfig.content = content;
    }

    /**
     * 获取代理并判断是否为手机端
     * @ return {string}
     */
    initProxy(): void {
        const { protocol, host, search} = location;
        const isMobile =  this.detectMob();
        let url = search.substr(1);
        let args = {};
        let hostName = host.slice(0, 4) == "www." ? host.slice(4) : host;
        let items = url.length ? url.split('&') : [];
        for (let i = 0; i < items.length; i++) {
            let argsArr = items[i].split('=');
            let length = argsArr[0].toString().length;
            //防止多个=号
            args[argsArr[0].toString()] = items[i].slice(length + 1);
        }
        // 如果为手机端
        if (isMobile) {
          if (!!args['p']) {
            location.href = protocol + '//m.' + hostName + search;
          } else {
            location.href = protocol + '//m.' + hostName;
          }
          return;
        }
        // 如果为PC端
        if (!!args['p']) {
          this.proxy = args['p'];
          sessionStorage.setItem('proxyName', this.proxy);
          this.router.navigateByUrl('/register');
        }
    }

    // 设备检测
    detectMob(): boolean {
      return Boolean((navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ));
    }

    /**
     * pc路由名称
     * @ param arr
     */
    localRouteLink(arr: Array<any>): any {
        const localLink = {
            'home': '/home/index',
            'chess': '/game/chess',
            'live': '/game/live',
            'electronic': '/game/electronic',
            'sports': '/game/sports',
            'esports': '/game/esports',
            'lottery': '/game/lottery',
            'fish': '/game/fish',
            'discount': '/home/discount',
            'mall': '/integral/integralMall',//积分
            'dtqp': '/game/dtqp',
            'download': '/home/download',//下载
            'coupon': '/',
            'phoneonline': '/',
            'weixinonline': '/'
        };
        arr.map(item => {
            for (let key in localLink) {
                if (item.url === key) {
                    item.link = localLink[key];
                }
            }
        });
        return arr;
    }

}

