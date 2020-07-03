import { Component, OnInit } from '@angular/core';
import { GameService } from '@service/game.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from "@src/app/config/config.service";

@Component({
    selector: 'app-live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.less']
})
export class LiveComponent implements OnInit {
    //banner背景图片
    public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/live_banner.jpg`;

    constructor(
        public service: GameService,
        public route: ActivatedRoute,
        public config: ConfigService
    ) { 
        console.log(this.service.currentGameList);
        
    }

    ngOnInit() {}
}
