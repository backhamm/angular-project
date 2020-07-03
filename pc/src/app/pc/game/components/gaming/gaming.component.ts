import { Component, OnInit } from '@angular/core';
import { GameService } from '@service/game.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from "@src/app/config/config.service";

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.less']
})
export class GamingComponent implements OnInit {
    //banner背景图片
    public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/gaming_banner.jpg`;

    constructor(
        public service: GameService,
        public route: ActivatedRoute,
        public config: ConfigService
    ) { }

    ngOnInit() {}
}
