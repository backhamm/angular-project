import {Injectable} from '@angular/core';

export const config = {
  "platform": {
    "title": "太阳城",
    // "BASE_IMG_URL": "http://192.168.106.140:81/Project_3.0/TYXC/",
    "BASE_IMG_URL": "//image.beike188.com/TYXC/",
    "DOWN_LOAD_APP": "https://www.load-code.com/2code_php/jump.html?id=231"
  }
};

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private readonly config;
    private hostname = window.location.host;
    private protocol = window.location.protocol;

    constructor() {
        this.config = config;
        this.setPageTitle();
    }

    /**
     * 返回平台名称
     */
    get platformName(): string {
        return this.config.platform.title;
    }

    /**
     * 获取pc网站图片链接
     */
    get baseImgUrl(): string {
        return this.config.platform.BASE_IMG_URL;
    }

    /**
     * app下载链接链接
     */
    get downloadAppUrl(): string {
        return this.config.platform.DOWN_LOAD_APP;
    }

    /**
     * 请求地址
     * @return {string}
     */
    get requestUrl(): string {
        return this.protocol + '//' + this.hostname + '/api/';
    }
    setPageTitle() {
        document.getElementsByTagName("title")[0].innerText = this.config.platform.title;
    }
}
