import {Component, OnInit} from '@angular/core';
import {PlatformService} from "@service/platform.service";

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

    constructor(
        public service: PlatformService
    ) {
    }

    // 公告
    get newsList() {
      const noticeArr =  this.service.webComConfig.filter(item => !item || item.type === '6');
      return noticeArr.length ? noticeArr[0].configs : [];
    }


    ngOnInit() {
        // this.MapNotice();
    }

}
