import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../service/game.service";
import {CommonService} from "../../../service/common.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {ConfigService} from "@src/app/config/config.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-mobile-game-common',
  templateUrl: './mobile-game-common.component.html',
  styleUrls: ['./mobile-game-common.component.less']
})
export class MobileGameCommonComponent implements OnInit {
  //当前路由二级菜单
  public gameArr: Array<any> = [];
  //不需要跳转的游戏列表
  public gameKeep: Array<any> = ['chess', 'dtqp', 'live', 'electronic', 'sports', 'electricContest', 'lottery', 'esports', 'fish'];
  public link: string = sessionStorage.getItem('gameLink') || '';

  constructor(
    public gameService: GameService,
    public route: ActivatedRoute,
    public router: Router,
    public commonService: CommonService,
    public auth: AuthenticationService,
    public config: ConfigService,
    public message: NzMessageService
  ) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.gameService.getNavList().subscribe(() => {
      this.getSecondGameList();
    });
  }

  // 初始化存储游戏link，获取二级菜单信息
  getSecondGameList() {
    if (!this.link) {
      // this.commonService.commonRouteTitle = this.gameService.navGameList[0].menuNameCn;
      this.link = this.gameService.navGameList[0].url;
      sessionStorage.setItem('gameLink', this.link);
    } else {
      // this.commonService.commonRouteTitle = this.gameService.navGameList.find(item => item.url === this.link).menuNameCn;
    }
    //获取二级菜单信息
    this.gameArr = this.gameService.navGameList.find(item => item.url === this.link).subMenus;
  }

  // 切换游戏
  changeGame(val: string, title: string) {
    if (this.link === val) { return; }
    // this.commonService.commonRouteTitle = title;
    this.link = val;
    sessionStorage.setItem('gameLink', val);
    //获取二级菜单信息
    this.gameArr = this.gameService.navGameList.find(item => item.url === this.link).subMenus;
    document.querySelector('.gamelist-main').scrollTop = 0;
  }

  loadGame(item): any {
      // hasSub 验证判断是否有下级
    const {gameCode, gameId, hasSub, id} = item;
    if (hasSub) {
      return this.router.navigate(['/m/game/allgames'], {queryParams: { id }});
    }
    const params = {
      gameCode,
      gameId,
    };
    this.gameService.loadMobileGame(params);
  }

  // 侧边栏切换游戏时不跳转路由，其他跳转
  isKeep(val: string) {
    return this.gameKeep.includes(val);
  }

  // 需要跳转的路由
  routerLink(url: string) {
    const linkList = {
      discount: '/m/activity/discount',
      mall: '/m/integral',
      help: '/m/help',
      about: '/m/help/about',
      coupon: '/m/activity/coupons',
      adventures: '/m/activity/adventures'
    };
    let list = ['coupon', 'adventures'];
    if (!this.auth.isAuth && list.includes(url)) {
      this.message.warning('请先登录！');
      this.router.navigate(['/m/login']);
    } else {
      this.router.navigate([linkList[url]]);
    }
  }

  // 游戏排列样式
  gameTemplate() {
    const type = ['live', 'electronic', 'dtqp'];
    return type.includes(this.link);
  }
}
