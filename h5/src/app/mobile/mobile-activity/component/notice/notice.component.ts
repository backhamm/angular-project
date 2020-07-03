import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-notice',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.less']
})
export class NoticeComponent implements OnInit, AfterViewInit {

    @Input() options: any;
    public scroll: number = 0;
    public listHeight: number = 0;
    public isTransition: boolean = true;
    public scrollHeight: number;

    listScroll(time: number = 1000): any {
        setTimeout(() => {
            this.scroll += this.scrollHeight;
            if (this.scroll >= this.listHeight - this.scrollHeight * 4) {
                this.isTransition = false;
                this.scroll = 0;
                return this.listScroll(50);
            } else {
                this.isTransition = true;
            }
            this.listScroll();
        }, time);
    }

    betterList() {
        // @ts-ignore
        let scrollArr = this.options.scrollArr;
        if (scrollArr.length % 2 !== 0) {
            scrollArr.splice(scrollArr.length - 1, scrollArr.length);
        }
        let arrPush = scrollArr.map(el => el).splice(0, 10);
        scrollArr.push(...arrPush);
    }

    constructor() {
    }

    init() {
        this.betterList();
        this.listScroll();
    }

    ngOnInit() {
        this.init();
    }

    ngAfterViewInit() {
        this.listHeight = document.getElementById("winnersList").offsetHeight;
        this.scrollHeight = document.getElementById("winnersList").children[0].clientHeight;
    }

}
