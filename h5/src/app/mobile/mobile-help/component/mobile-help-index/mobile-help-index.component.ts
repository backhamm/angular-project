import {Component, OnInit} from '@angular/core';
import helpObj from '../../help';

@Component({
    selector: 'app-mobile-help-index',
    templateUrl: './mobile-help-index.component.html',
    styleUrls: ['./mobile-help-index.component.less']
})
export class MobileHelpIndexComponent implements OnInit {
    public helpClass: Array<any> = [];
    public homePageIssue: Array<any> = [];
    public specialPage: Array<string> = ['会员制度', '代理规则'];

    constructor() {
    }

    ngOnInit() {
        // 解决会员中心帮助入口跳转过来后，滚动条未置顶的问题
        document.getElementsByClassName('mobile-layout-container')[0].scrollTop = 0;
        let {helpClass, homePageIssue} = helpObj;
        this.helpClass = helpClass;
        this.homePageIssue = homePageIssue;
    }

    defaultSkip(title: string) {
        return this.specialPage.every(item => title !== item);
    }

}
