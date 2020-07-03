import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import MeScroll from 'mescroll.js/mescroll.min.js';

@Component({
    selector: 'app-mobile-mescroll',
    templateUrl: './mobile-mescroll.component.html',
    styleUrls: ['./mobile-mescroll.component.less']
})
export class MobileMescrollComponent implements OnInit {
    @Output() getData: EventEmitter<any> = new EventEmitter();
    @Input() params: any;
    mescroll: any = null;

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * @author Merlin
     * @date 2019/12/28
     * @Description: 创建mescroll实例
     */

    createRefresh(list: Array<any> = []): void {
        if (this.mescroll) {
            return;
        }
        const {pageSize, pageNo} = this.params;
        this.mescroll = new MeScroll('mescroll', {
            up: {
                callback: ({size, num}, mescroll) => {
                    this.params.pageSize = size * num;
                    this.getRecord();
                },
                htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>',
                offset: -100,
                auto: false,
                use: true,
                noMoreSize: 7,
            },
            down: {
                callback: (mescroll) => {
                    this.getRecord();

                },
                auto: false,
            }
        });
    }

    getRecord(): void {
        setTimeout(() => this.getData.emit(true), 500);
    }

    // 处理返回
    dealResponse({list, total}: any): void {
        this.mescroll.endBySize(list.length, total);
    }

    // original
    original() {
        this.params && (this.params.pageSize = 10);
        this.mescroll ? this.mescroll.resetUpScroll() : this.getRecord();
    }
}
