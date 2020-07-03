import {Component, OnInit, Input, Output, EventEmitter, NgZone, ElementRef} from '@angular/core';
import {CapitalService} from '@service/capital.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-mobile-timer',
    templateUrl: './mobile-timer.component.html',
    styleUrls: ['./mobile-timer.component.less']
})
export class MobileTimerComponent implements OnInit {

    @Input() getData: any;
    @Input() tableData: any;

    //查询时间
    starTimes = new Date();
    endTimes = new Date();
    dateTimeSelect: number = 0;
    //快捷选时
    quickArr: { date: string, value: number }[] = [
        {date: '今天', value: 0},
        {date: '三天', value: 1},
        {date: '本周', value: 2},
        {date: '一个月', value: 3},
    ];

    constructor(public service: CapitalService, public message: NzMessageService, public zone: NgZone, public element: ElementRef) {
    }

    //限制时间
    disabledStartDate = (starTimes: Date): boolean => {
        if (!starTimes || !this.endTimes) {
            return false;
        }
        return starTimes.getTime() > this.endTimes.getTime();
    }
    disabledEndDate = (endTimes: Date): boolean => {
        if (!endTimes || !this.starTimes) {
            return false;
        }
        return endTimes.getTime() <= this.starTimes.getTime();
    }

    //date 选中时间
    startChange(date: Date) {
        this.starTimes = date;
        this.getData(false, false, true);
    }

    endChange(date: Date) {
        this.endTimes = date;
        this.getData(false, false, true);
    }

    ngOnInit() {
    }

    //快捷选择时间
    quickChange(value: number): void {
        this.dateTimeSelect = value;
        let start: Date;
        let end = new Date();
        //今天
        if (value === 0) {
            start = new Date();
            this.tableData = {};
        } else if (value === 1) {
            start = new Date(end.getTime() - 2 * 24 * 3600 * 1000);
            this.tableData = {};
        } else if (value === 2) {
            start = new Date(end.getTime() - 6 * 24 * 3600 * 1000);
            this.tableData = {};
        } else if (value === 3) {
            let year = end.getFullYear();
            let month = end.getMonth();
            let maxDay = new Date(year, month, 0).getDate() - 1;
            start = new Date(end.getTime() - maxDay * 24 * 3600 * 1000);
            this.tableData = {};
        }
        this.starTimes = start;
        this.endTimes = end;
        this.getData(false, false, true);
    }

    dateFormateStart(date: Date, starTimes: boolean = true): string {
        let year = date.getFullYear();
        let month = ('00' + (date.getMonth() + 1)).slice(-2);
        let day = ('00' + date.getDate()).slice(-2);
        if (starTimes) {
            return `${year}-${month}-${day} 00:00:00`;
        } else {
            return `${year}-${month}-${day} 23:59:59`;
        }
    }

    dateFormateEnd(date: Date, endTimes: boolean = false): string {
        let year = date.getFullYear();
        let month = ('00' + (date.getMonth() + 1)).slice(-2);
        let day = ('00' + date.getDate()).slice(-2);
        if (endTimes) {
            return `${year}-${month}-${day} 00:00:00`;
        } else {
            return `${year}-${month}-${day} 23:59:59`;
        }
    }

}
