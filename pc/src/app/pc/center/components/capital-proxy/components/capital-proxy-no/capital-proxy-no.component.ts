import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CapitalService } from '@service/capital.service';
import { NzMessageService } from 'ng-zorro-antd';
import {ResponseBody} from "@src/app/types/common.type";
import { ConfigService } from '@src/app/config/config.service';

@Component({
    selector: 'app-capital-proxy-no',
    templateUrl: './capital-proxy-no.component.html',
    styleUrls: ['./capital-proxy-no.component.less']
})
export class CapitalProxyNoComponent implements OnInit {

    constructor(
        public service: CapitalService,
        public message: NzMessageService,
        public config: ConfigService
    ) { }

    ngOnInit() {

    }

}

