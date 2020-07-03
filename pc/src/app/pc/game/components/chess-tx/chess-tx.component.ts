import { Component, OnInit } from '@angular/core';
import { GameService } from '@service/game.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from "@src/app/config/config.service";

@Component({
  selector: 'app-chess-tx',
  templateUrl: './chess-tx.component.html',
  styleUrls: ['./chess-tx.component.less']
})
export class ChessTxComponent implements OnInit {
    //banner背景图片
    public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/dtqp_banner.jpg`;

    constructor(
        public service: GameService,
        public route: ActivatedRoute,
        public config: ConfigService
    ) { }

    ngOnInit() {}

}
