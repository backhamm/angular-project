import {Component, OnInit} from '@angular/core';
import {PlatformService} from "@service/platform.service";
import {ConfigService} from "@src/app/config/config.service";


@Component({
    selector: 'app-mobile-customer-service',
    templateUrl: './mobile-customer-service.component.html',
    styleUrls: ['./mobile-customer-service.component.less']
})
export class MobileCustomerServiceComponent implements OnInit {
	// 老版本的在线客服样式
	public old: boolean = false;
    constructor(
        public platService: PlatformService,
        public config: ConfigService
    ) {
    }

    ngOnInit() {
      window.location.href = this.platService.onlineService;
    }

}
