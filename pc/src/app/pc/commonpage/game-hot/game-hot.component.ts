import { Component, OnInit } from '@angular/core';
import { GameService } from "@service/game.service";
import { PlatformService } from "@service/platform.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-hot',
  templateUrl: './game-hot.component.html',
  styleUrls: ['./game-hot.component.less']
})
export class GameHotComponent implements OnInit {
  hotArr: Array<any> = [
    { herf: '', iback: '0', menuNameCn: '大唐棋牌', gameCode: 'dtqp', gameId: '0' },
    { herf: '', iback: '0', menuNameCn: '六合彩(IG六合彩)', gameCode: 'IGPJLOTTO', gameId: '0' },
    { herf: '', iback: '0', menuNameCn: '时时彩(IG时时彩)', gameCode: 'IGLOTTERY', gameId: '73' },
    { herf: '', iback: '0', menuNameCn: '沙巴体育', gameCode: 'IBC', gameId: '0' },
    { herf: '', iback: '0', menuNameCn: 'IM体育', gameCode: 'IM', gameId: 'imsb' },
    { herf: '', iback: '0', menuNameCn: 'BG视讯', gameCode: 'BG', gameId: '0' },
    { herf: '', iback: '0', menuNameCn: '三倍猴子(PT)', gameCode: 'PT', gameId: 'trpmnk' },
    { herf: '', iback: '0', menuNameCn: '冰球突破豪华版(MG)', gameCode: 'MG', gameId: '71974' },
    { herf: '', iback: '0', menuNameCn: 'BBIN电子游戏', gameCode: 'BBIN', gameId: '2' },
    { herf: '', iback: '0', menuNameCn: 'AG视讯', gameCode: 'AG', gameId: '0' },
    { herf: '', iback: '0', menuNameCn: 'BBIN视讯', gameCode: 'BBIN', gameId: '1' },
    { herf: '/game/sports', iback: '1', menuNameCn: '体育投注', gameCode: '', gameId: '0' },
    { herf: '/game/lottery', iback: '1', menuNameCn: '彩票游戏', gameCode: '', gameId: '0' },
  ]
  constructor(public service: GameService, public plat: PlatformService, public router: Router) { }
  subClick(data: any, link: string) {
    if (data.iback === '1') {
      this.router.navigate([link]);
    } else {
      this.service.loadGame({ gameCode: data.gameCode, gameId: data.gameId });
    }
  }
  ngOnInit() {
  }

}
