import {Component, OnInit} from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";
import {PlatformService} from "@service/platform.service";
import QRCode from 'qrcode';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

    constructor(
        public config: ConfigService,
        public platform: PlatformService
    ) {}

    // 二维码下载显示隐藏
    appDownLoad: boolean = false;

    // 当前年份
    currentYears: number = new Date().getFullYear();

    /**
     * 回到顶部
     */
    backTop(): void {
        // scrollTop属性表示被隐藏在内容区域上方的像素数。元素未滚动时，scrollTop的值为0，
        // 如果元素被垂直滚动了，scrollTop的值大于0，且表示元素上方不可见内容的像素宽度
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    /**
     *  二维码下载显示隐藏
     */
    qrCodeToggle() {
        this.appDownLoad = !this.appDownLoad;
    }

    qrCode(): void {
        // tslint:disable-next-line:no-unused-expression
        let canvas = document.getElementById('download');
        let url = this.config.downloadAppUrl;
        QRCode.toCanvas(canvas, url, {width: 200}, function (error) {
            if (error) {
                console.error(error);
            }
        });
    }


    ngOnInit() {
        this.qrCode();
    }

}
