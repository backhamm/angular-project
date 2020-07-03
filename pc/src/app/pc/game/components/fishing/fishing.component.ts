import {Component, OnInit} from '@angular/core';
import {GameService} from '@service/game.service';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from "@src/app/config/config.service";
import {fishIntroduction} from "@src/app/util/text";

@Component({
    selector: 'app-fishing',
    templateUrl: './fishing.component.html',
    styleUrls: ['./fishing.component.less']
})
export class FishingComponent implements OnInit {
    //banner背景图片
    public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/fish_banner.jpg`;

    //切换捕鱼
    public tabIndex: number = 0;
    //切换简介
    public intrIndex: number = 0;
    //游戏简介
    public fishIntr: any = '';

    constructor(
        public service: GameService,
        public route: ActivatedRoute,
        public config: ConfigService
    ) {
    }

    ngOnInit() {
    }

    /**
     * @description: 获取当前游戏介绍
     * @author: table
     * @param key
     */
    getFishIntr(key: string): void {
        return fishIntroduction.find((value: any) => value.platformKey === key);
    }

    /**
     * @description: 切换捕鱼类型
     * @author: table
     * @param index 点击下标
     * @param key platformKey
     */
    changeType(index: number, key: string): void {
        this.tabIndex = index;
        this.fishIntr = this.getFishIntr(key);
    }
}
