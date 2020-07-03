import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {ActivityService} from "@service/activity.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {Location} from "@angular/common";

@Component({
    selector: 'app-mobile-adventures',
    templateUrl: './mobile-adventures.component.html',
    styleUrls: ['./mobile-adventures.component.less']
})
export class MobileAdventuresComponent implements OnInit, AfterViewChecked {

    public arr: Array<any> = [];
    public scroll: number = 0;
    public listHeight: number = 0;
    public itemHeight: number = 0;
    public isTransition: boolean = true;
    public btnImages: object = ['dzp_btn_d', 'dzp_btn_n', 'dzp_btn_per'];
    public btnImage: number = 1;
    public isGame: boolean = false;
    public rotate: number = 0;
    public rotateTime: number = 0;
    public rank: number;
    public showResult: boolean = false;
    public resultType: number = 1;
    public prizeName: string = '';

    constructor(
        public baseActivity: ActivityService,
        public router: Router,
        public message: NzMessageService,
        public location: Location
    ) {}

    listScroll(time: number = 1000): any {
        setTimeout(() => {
            this.scroll += this.itemHeight;
            if (this.scroll >= this.listHeight - this.itemHeight * 2) {
                this.isTransition = false;
                this.scroll = 0;
                return this.listScroll(50);
            } else {
                this.isTransition = true;
            }
            this.listScroll();
        }, time);
    }

    /**
     * 生成无缝滚动列表
     */
    betterList() {
        let length = 6;     //滚动区item个数
        let arr = this.arr;
        if (arr.length < length) {
            for (let i = arr.length; i < length; i++) {
                arr[i] = arr[i - arr.length];
            }
        }
        if (arr.length % 2 !== 0) {
            arr.splice(arr.length - 1);
        }
        let arrPush = arr.map(el => el).splice(0, length);
        arr.push(...arrPush);
        this.listHeight = document.getElementById("winnersList").offsetHeight;
    }

    returns() {
        this.location.back();
    }

    closeResult(e) {
        if (e.target.className === 'adv-result') {
            this.showResult = false;
        }
    }

    resultClick() {
        this.resultType === 1 ? this.router.navigate(['/m/home']) : this.router.navigate(['/m/customerService']);
    }

    getGameResult() {
        if (!this.btnImage) { return; }
        this.baseActivity.discLottery().subscribe(res => {
            if (res.msg === '未配置活动' || res.msg === '不在活动时间内') {
                this.btnImage = 0;
                return this.message.error(res.msg);
            }
            if (res.status === 40000) {
                this.showResult = true;
                this.resultType = 1;
                this.btnImage = 0;
            } else if (res.status === 10000) {
                this.gameStart(res.data);
            } else {
                return this.message.error(res.msg);
            }
        });
    }

    gameStart(data: any) {
        if (this.isGame) { return; }
        let listTimes = 360 / this.baseActivity.discData.list.length;
        this.isGame = true;
        this.rank = data.prizeLevel;
        this.rotateTime++;
        this.rotate = -this.rank * listTimes + listTimes + 3600 * this.rotateTime;
        this.btnImage = 2;
        setTimeout(() => {
            if (data.prizeType === 2) {
                this.resultType = 3;    // 谢谢惠顾
            } else {
                this.resultType = 2;    // 中奖
                this.prizeName = data.prizeName;
            }
            this.btnImage = 1;
            this.showResult = true;
            this.isGame = false;
        }, 10000);
    }

    init() {
        this.rotateTime = 0;
        this.rank = 0;
        //用户中奖信息
        this.baseActivity.getDiscRecive().subscribe();
        //转盘奖品
        this.baseActivity.getDiscList().subscribe();
        //所有中奖名单
        this.baseActivity.getMobileDiscWining().subscribe(res => {
            this.arr = res.status === 10000 ? res.data : [];
            this.betterList();
            this.listScroll();
        });
    }

    ngOnInit() {
        this.init();
    }

    ngAfterViewChecked() {
        if (this.listHeight && this.itemHeight) { return; }
        try {
            this.listHeight = document.getElementById("winnersList").offsetHeight;
            this.itemHeight = document.getElementById("winnersList").children[0].clientHeight;
        } catch (e) {}
    }
}
