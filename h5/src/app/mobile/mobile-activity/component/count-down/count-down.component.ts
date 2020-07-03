import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-count-down',
    templateUrl: './count-down.component.html',
    styleUrls: ['./count-down.component.less']
})
export class CountDownComponent implements OnInit, OnDestroy {

    public days: any;
    public hours: any;
    public minutes: any;
    public seconds: any;
    public timer: any;

    @Input() diff: number = 0;
    @Output() isAppear = new EventEmitter<string>();

    constructor() {
    }

    addEvent() {
        this.isAppear.emit();
    }

    timeDifference() {
        this.timer = setInterval(() => {
            this.countDownFn();
        }, 1000);
    }

    countDownFn() {
        if (this.diff === 0) {
            clearInterval(this.timer);
            this.addEvent();
            return;
        }
        this.diff--;
        let dayDiff: any = Math.floor(this.diff / (24 * 3600)); //计算出相差天数
        dayDiff = dayDiff < 10 ? '0' + dayDiff : dayDiff;
        let leave1 = this.diff % (24 * 3600);    //计算天数后剩余的毫秒数
        let hours: any = Math.floor(leave1 / (3600)); //计算出小时数
        hours = hours < 10 ? '0' + hours : hours;
        let leave2 = leave1 % (3600);    //计算小时数后剩余的毫秒数
        let minutes: any = Math.floor(leave2 / (60)); //计算相差分钟数
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let leave3 = leave2 % (60);      //计算分钟数后剩余的秒数
        let seconds: any = Math.round(leave3);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        this.days = dayDiff;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    ngOnInit(): void {
        this.timeDifference();
    }

    ngOnDestroy(): void {
        clearInterval(this.timer);
    }

}
