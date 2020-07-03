import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '@src/app/config/config.service';
import {PlatformService} from '../../service/platform.service';
import {NzModalService} from 'ng-zorro-antd';
import {GameService} from '@service/game.service';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AuthenticationService} from "@service/authentication.service";
import {Router} from "@angular/router";
import {ActivityService} from "@service/activity.service";
import {MobileScavengerComponent} from "@src/app/mobile/mobile-activity/mobile-scavenger/mobile-scavenger.component";
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-mobile-index',
  templateUrl: './mobile-index.component.html',
  styleUrls: ['./mobile-index.component.less'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-20%)' , opacity: 0}),
        animate('200ms', style({transform: 'translateY(0)', opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms', style({transform: 'translateY(-20%)', opacity: 0}))
      ])
    ])
  ]
})
export class MobileIndexComponent implements OnInit {
  @ViewChild('scavenger', null) scavenger: MobileScavengerComponent;
  @ViewChild('carousel', null) carousel: ElementRef;

  // 首页推荐头部选中下标
  public REIndex = 0;
  // 首页推荐内容是否正在滑动中
  public isSlide = false;
  // 推荐内容是否点击头部导航跳转
  public isClick = false;
  isVisible = false;

  showDownloadMain: boolean = false;
  isIOS: boolean;
  // 客服小姐姐图片移动
  isMove = false;
  // 公告
  get noticeList() {
    const list = this.service.webComConfig.filter(item => !item || Number(item.type) === 6);
    return (list.length ? list[0].configs : []);
  }

  // 轮播
  get carouselList() {
    const list = this.service.webComConfig.filter(item => !item || Number(item.type) === 1);
    return (list.length ? list[0].configs : []);

  }

  // 平台推荐
  get recommendList() {
    return this.gameService.recommendList.slice(0, 8);
  }

  constructor(
    public config: ConfigService,
    public service: PlatformService,
    public modal: NzModalService,
    public loadingBar: LoadingBarService,
    public gameService: GameService,
    public auth: AuthenticationService,
    public router: Router,
    public activity: ActivityService,
  ) {

  }

  ngOnInit() {
    this.isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? true : false;
    this.gameService.getNavList().subscribe();
    // 滚动条时间处理，自定义处理
    // this.loadingBar.start(200000)
  }

  get kefujjService() {
    const data = this.service.webComContact.filter(item => !item || item.type === 16);
    return data.length ? data : '';
  }

  get dailineService() {
    const data = this.service.webComContact.filter(item => !item || item.type === 15);
    return data.length ? data : '';
  }

  /**
   * @description: 进入游戏
   * @param gameData
   */
  loadMobileGame(gameData): void {
    let {gameCode, gameId, viewType, id} = gameData;
    if (Number(viewType) === 4) {
      this.router.navigate(['/m/game/allgames'], {queryParams: { id }});
    } else {
      let params = {gameCode, gameId};
      this.gameService.loadMobileGame(params);
    }
  }

  getDiscountImg(index) {
    let img = this.service.discountList[index];
    if (img) {
      return `url(${img.smallImg})`;
    }
  }

  toCarousel(i) {
    if (!this.isSlide) {
      this.REIndex = i;
      this.isClick = true;
      // @ts-ignore: Unreachable code error
      this.carousel.goTo(i);
    }
  }

  goKefu() {
    window.location.href = this.service.kefuService;
  }

  // 显示app下载详情
  openDownload(): void {
    this.showDownloadMain = !this.showDownloadMain;
  }

  // 首页推荐左右滑动
  beforeChange({from, to}) {
    let length = this.recommendList.length - 1;
    if (Math.abs(from - to) === length && !this.isClick) {
      this.router.navigate(['/m/game']);
    } else {
      this.isClick = false;
      this.isSlide = true;
      this.REIndex = to;
    }
  }
}
