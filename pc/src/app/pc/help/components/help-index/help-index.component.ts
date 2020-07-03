import { Component, OnInit } from '@angular/core';
import { PlatformService } from '@src/app/service/platform.service';
import { CommonService } from '@src/app/service/common.service';

@Component({
    selector: 'app-help-index',
    templateUrl: './help-index.component.html',
    styleUrls: ['./help-index.component.less']
})
export class HelpIndexComponent implements OnInit {

    constructor(public service: PlatformService, public commonService: CommonService) { }

    ngOnInit() {
    }
 // 公告
 get noticeList() {
    const noticeArr = this.service.webComConfig.filter(item => !item || item.type === '6');
    return noticeArr.length ? noticeArr[0].configs : [];
  }
  //公告点击弹框事件  
  clickStart(value: string) {
      this.commonService.noticeAlert(value);
  }
}
