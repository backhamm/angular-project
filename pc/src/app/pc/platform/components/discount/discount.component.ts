import {Component, OnInit} from '@angular/core';
import {PlatformService} from '@service/platform.service';

@Component({
    selector: 'app-discount',
    templateUrl: './discount.component.html',
    styleUrls: ['./discount.component.less']
})
export class DiscountComponent implements OnInit {
    // 中间过渡
    middleArr: Array<any> = [];
    get discountList() {
        if (this.middleArr.length) {
            return this.middleArr;
        }
        const discountArr = this.service.webComConfig.filter(item => !item || item.type === '4');
        const cur = discountArr.length ? discountArr[0].configs : [];
        this.middleArr = cur.map((item: any) => ({show: false, ...item}));
        return this.middleArr;
    }
    constructor(public service: PlatformService) {}
    ngOnInit() { }
    showDetail(item, i) {
        const isShow = !item.show;
        this.middleArr.forEach((e: any, index: number) => {
            e.show = false;
            if (i === index) {
                e.show = isShow;
            }
        });
    }
}
