import {Component, OnInit} from '@angular/core';
import {PlatformService} from "@service/platform.service";
import {ConfigService} from "@src/app/config/config.service";

@Component({
    selector: 'app-mobile-help-about',
    templateUrl: './mobile-help-about.component.html',
    styleUrls: ['./mobile-help-about.component.less']
})
export class MobileHelpAboutComponent implements OnInit {

    constructor(
      public plat: PlatformService,
      public config: ConfigService
    ) {
    }

    ngOnInit() {
    }
}
