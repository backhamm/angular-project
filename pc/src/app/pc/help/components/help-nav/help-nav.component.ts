import {Component, OnInit} from '@angular/core';
import {HelpService} from '../../help.service';
import {PlatformService} from "@service/platform.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-help-nav',
    templateUrl: './help-nav.component.html',
    styleUrls: ['./help-nav.component.less']
})
export class HelpNavComponent implements OnInit {
    curRouter: any = '';

    constructor(
        public service: HelpService,
        public platform: PlatformService,
        public route: Router,
    ) {
        this.route.events.subscribe((data) => {
            if (data instanceof NavigationEnd) {
                this.curRouter = data.url;
            }
        });
    }

    ngOnInit() {


    }

}
