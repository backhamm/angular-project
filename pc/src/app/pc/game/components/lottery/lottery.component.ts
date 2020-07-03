import { Component, OnInit } from '@angular/core';
import { GameService } from '@service/game.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from "@src/app/config/config.service";
import {lotyProfitData} from "@src/app/util/text";

@Component({
    selector: 'app-lottery',
    templateUrl: './lottery.component.html',
    styleUrls: ['./lottery.component.less']
})
export class LotteryComponent implements OnInit {
    //banner背景图片
    public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/lottery_banner.jpg`;

    //盈利数据
    public lotyProfitData: Object[] = lotyProfitData;

    constructor(
        public service: GameService,
        public route: ActivatedRoute,
        public config: ConfigService
    ) { }

    ngOnInit() {}
}
