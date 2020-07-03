import { Component, OnInit } from '@angular/core';
import { GameService } from '@service/game.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from "@src/app/config/config.service";

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.less']
})
export class FreeComponent implements OnInit {
  public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/free_banner.jpg`;

  constructor(
    public service: GameService,
    public route: ActivatedRoute,
    public config: ConfigService
  ) { }

  get currentGameList() {
    console.log(this.service.tryGameLists)
    return this.service.tryGameLists;
  }

  ngOnInit() {
  }

}
