import {Component, OnInit} from '@angular/core';
import {GameService} from "@service/game.service";
import {ConfigService} from "@src/app/config/config.service";
@Component({
	selector: 'app-mobile-free',
	templateUrl: './mobile-free.component.html',
	styleUrls: ['./mobile-free.component.less']
})
export class MobileFreeComponent implements OnInit {
	constructor(public game: GameService,public configService: ConfigService,) {
	}
	get gameArr() {
		return this.game.freeList;
	}
	ngOnInit() {
		// 刷新情况下单独处理游戏列表数据
		console.log(!this.game.navGameList.length);
		if (!this.game.navGameList.length) {
			this.game.getNavList().subscribe();
		}
	}
	loadGame(item): any {
		const { gameCode, gameId } = item;
		const params = {
			gameCode,
			gameId,
		};
		this.game.loadMobileFreeGame(params);
	}
}
