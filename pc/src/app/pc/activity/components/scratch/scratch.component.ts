import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivityService } from '@service/activity.service';
import { ConfigService } from '@src/app/config/config.service';
import { Scratch } from './scratch';
import {AuthenticationService} from '@service/authentication.service';

@Component({
    selector: 'app-scratch',
    templateUrl: './scratch.component.html',
    styleUrls: ['./scratch.component.less']
})
export class ScratchComponent implements OnInit, AfterViewInit {

    constructor(
        public el: ElementRef,
        public service: ActivityService,
        public config: ConfigService,
        public scratch: Scratch,
        public auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.service.scratchInit();
        let nativeElement = this.el.nativeElement;
        let canvas = nativeElement.querySelector('#canvas');
        this.scratch.canvasInt(canvas);
    }
    ngAfterViewInit() {
    }
}
