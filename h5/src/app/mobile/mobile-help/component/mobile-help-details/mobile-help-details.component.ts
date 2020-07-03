import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import helpObj from '../../help';

@Component({
    selector: 'app-mobile-help-details',
    templateUrl: './mobile-help-details.component.html',
    styleUrls: ['./mobile-help-details.component.less']
})
export class MobileHelpDetailsComponent implements OnInit {
    public issueTitle: string = '';
    public issueDetails: any = [];

    constructor(
        public route: ActivatedRoute
    ) {
    }

    back() {
        history.go(-1);
    }


    ngOnInit() {
        let issueId = this.route.snapshot.paramMap.get('id');
        let {issueDetailsList} = helpObj;
        this.issueTitle = this.route.snapshot.paramMap.get('title');
        this.issueDetails = issueDetailsList[issueId];
    }

}
