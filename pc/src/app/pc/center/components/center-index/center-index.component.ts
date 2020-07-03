import {Component, OnInit} from '@angular/core';
import {PlatformService} from "@service/platform.service";
import {NzModalService} from "ng-zorro-antd";
import {WebComConfig} from "@src/app/types/common.type";
import {CapitalService} from '@service/capital.service';
import {CommonService} from "@service/common.service";

@Component({
    selector: 'app-center-index',
    templateUrl: './center-index.component.html',
    styleUrls: ['./center-index.component.less']
})
export class CenterIndexComponent implements OnInit {

    constructor(
        public platService: PlatformService,
        public modal: NzModalService,
        public common: CommonService,
        public capital: CapitalService
    ) {
    }

    // 公告
    get noticeList() {
        const noticeArr =  this.platService.webComConfig.filter(item => !item || item.type === '6');
        return noticeArr.length ? noticeArr[0].configs : [];
    }

    // 公告弹框
    noticeAlert(item: WebComConfig): void {
        const { data, title } = item;
        this.common.noticeAlert(data);
    }

    ngOnInit() {
    }

}
