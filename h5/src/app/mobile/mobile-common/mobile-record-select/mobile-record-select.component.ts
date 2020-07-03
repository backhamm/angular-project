import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { format } from 'date-fns/esm';
import {CapitalService} from "@service/capital.service";
import {ResponseBody} from "@src/app/types/common.type";
@Component({
    selector: 'app-mobile-record-select',
    templateUrl: './mobile-record-select.component.html',
    styleUrls: ['./mobile-record-select.component.less']
})
export class MobileRecordSelectComponent implements OnInit {
    @Input() params: any;
    @Input() isSelect: boolean;
    // 是否投注记录，默认资金记录
    @Input() isBet: boolean = false;
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() getData: EventEmitter<any> = new EventEmitter();
    // 侧边选择状态
    stateList = [];
    oneLevel = 0;
    twoLevel = 0;
    //快捷选时
    dateTimeSelect: number = -1;
    quickArr: { date: string, value: number }[] = [
        {date: '今天', value: 0},
        {date: '三天', value: 2},
        {date: '一周', value: 6},
        {date: '一月', value: 30},
    ];
    originalParams: any = {};
    constructor(public capital: CapitalService) {

    }

    ngOnInit() {
        this.originalParams = Object.assign({}, this.params);
        // 投注记录
        if (this.isBet) {
            this.capital.getBetConfig().subscribe((res: ResponseBody) => {
                const {status, data} = res;
                if (status === 10000) {
                    this.stateList = data;
                }
            });
        } else {
            this.capital.getHistoryConfig().subscribe((res: ResponseBody) => {
                const {status, data} = res;
                if (status === 10000) {
                    this.stateList = data;
                }
            });
        }

        this.quickChange(0);
    }

    //快捷选择时间
    quickChange(value: number): void {
        // 重复点击
        if (this.dateTimeSelect === value) {
            return;
        }
        const date = new Date();
        this.params.edate = new Date();
        // 设置n天前数据
        this.params.bdate = new Date(date.setDate(date.getDate() - value));
        this.dateTimeSelect = value;
        this.getData.emit(true);
    }

    //限制时间
    disabledStartDate = (bdate: Date): boolean => {
        if (!bdate || !this.params.edate) {
            return false;
        }
        return bdate.getTime() > this.params.edate.getTime();
    }
    disabledEndDate = (edate: Date): boolean => {
        if (!edate || !this.params.bdate) {
            return false;
        }
        return edate.getTime() <= this.params.bdate.getTime();
    }

    //date 选中时间
    changeDate(date: Date, params: string) {
        this.params[params] = date;
        // 去掉active状态
        this.dateTimeSelect = -1;
    }

    // 重置
    reset(): void {
        this.close.emit();
        this.twoLevel = this.oneLevel = 0;
        // 还原数据
        this.params = this.originalParams;
        this.quickChange(0);
    }

    submit(): void {
        const { stateList, twoLevel, oneLevel, isBet } = this;
        this.close.emit();
        // 投注记录资金记录单独处理
        if (isBet) {
            this.params.type = stateList[oneLevel].type;
            this.params.gameCode = stateList[oneLevel]['bets'][twoLevel].gameCode;
        } else {
            this.params.status = stateList[oneLevel].status;
            this.params.type = stateList[oneLevel]['types'][twoLevel].type;
        }

        this.getData.emit(true);

    }
	changeParams(isOne: boolean, i: number): void {
		if (isOne) {
			this.oneLevel = i;
			this.twoLevel = 0;
		} else {
			this.twoLevel = i;
		}
		const { stateList, twoLevel, oneLevel, isBet } = this;
		// 投注记录资金记录单独处理
		if (isBet) {
			this.params.type = stateList[oneLevel].type;
			this.params.gameCode = stateList[oneLevel]['bets'][twoLevel].gameCode;
		} else {
			this.params.status = stateList[oneLevel].status;
			this.params.type = stateList[oneLevel]['types'][twoLevel].type;
		}

    }
}
