import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { CommonService } from '@service/common.service';


/**
 * 手机或pc 路由限制
 */
@Injectable({
    providedIn: 'root'
})
export class AuthRouterGuard implements CanActivate {

    constructor(public router: Router, public comServer: CommonService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.createMeta();
        this.changeInit();
        this.autoSize();

        //处理代理P
        let url = location.search.substr(1);
        let agentUrls = {};
        let items = url.length ? url.split('&') : [];
        for (let i = 0; i < items.length; i++) {
            let agentUrlArr = items[i].split('=');
            let length = agentUrlArr[0].toString().length;
            //防止url多个=号
            agentUrls[agentUrlArr[0].toString()] = items[i].slice(length + 1);
        }
        if ( agentUrls['p'] ) {
            this.comServer.proxy = agentUrls['p'];
            sessionStorage.setItem('proxyName', this.comServer.proxy);
            this.router.navigateByUrl('/m/register');
            return;
        }
        return true;
    }


    //设备检测
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

    createMeta() {
        let oMeta = document.createElement('meta');
        oMeta.name = 'viewport';
        oMeta.content = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no';
        document.getElementsByTagName('head')[0].appendChild(oMeta);
    }

    autoSize() {
        let html = document.documentElement;
        let innerW = window.innerWidth;
        html.style.fontSize = innerW / 7.5 + "px";
    }

    changeInit() {
        window.onresize = () => {
            this.autoSize();
        };
    }

}
