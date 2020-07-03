import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-mobile-help-item',
    templateUrl: './mobile-help-item.component.html',
    styleUrls: ['./mobile-help-item.component.less']
})
export class MobileHelpItemComponent implements OnInit {
    @Input() title: string = '';

    constructor() {
    }

    ngOnInit() {
    }

}
