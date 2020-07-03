import { Component, OnInit } from '@angular/core';
import { GameService } from '@service/game.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from "@src/app/config/config.service";

@Component({
    selector: 'app-chess',
    templateUrl: './chess.component.html',
    styleUrls: ['./chess.component.less']
})
export class ChessComponent implements OnInit {
    //banner背景图片
    public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/chess_banner.jpg`;

    constructor(
        public service: GameService,
        public route: ActivatedRoute,
        public config: ConfigService
    ) { }

    ngOnInit() {}

}
