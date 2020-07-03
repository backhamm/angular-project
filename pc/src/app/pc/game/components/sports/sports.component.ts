import {Component, OnInit} from '@angular/core';
import {GameService} from '@service/game.service';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from "@src/app/config/config.service";
import {sptProfitData} from "@src/app/util/text";

@Component({
    selector: 'app-sports',
    templateUrl: './sports.component.html',
    styleUrls: ['./sports.component.less']
})
export class SportsComponent implements OnInit {
    //banner背景图片
    public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/sports_banner.jpg`;

    //盈利数据
    public sptProfitData: Object[] = sptProfitData;

    constructor(
        public service: GameService,
        public route: ActivatedRoute,
        public config: ConfigService
    ) {
    }

    ngOnInit() {
    }
}
