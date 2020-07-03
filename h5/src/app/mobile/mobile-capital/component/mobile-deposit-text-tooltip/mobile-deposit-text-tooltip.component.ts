import {Component, OnInit} from '@angular/core';
import {PlatformService} from "@service/platform.service";

@Component({
    selector: 'app-mobile-deposit-text-tooltip',
    templateUrl: './mobile-deposit-text-tooltip.component.html',
    styleUrls: ['./mobile-deposit-text-tooltip.component.less']
})
export class MobileDepositTextTooltipComponent implements OnInit {

    constructor(public platformService: PlatformService) {
    }

    ngOnInit() {
    }

}
