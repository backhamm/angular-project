import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/internal/operators';
import { pipe } from 'rxjs';
import { Location } from '@angular/common';
import { CommonService } from "@service/common.service";
import { GameService } from "@service/game.service";
import { PlatformService } from "@service/platform.service";
import { ConfigService } from "@src/app/config/config.service";
import { StorageService } from "@service/storage.service";
import { NavGameInfo, ResponseBody } from "@src/app/types/common.type";
import { ActivityService } from "@service/activity.service";
import { NzMessageService } from "ng-zorro-antd";
import { AuthenticationService } from '@src/app/service/authentication.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.less']
})
export class MobileHeaderComponent implements OnInit {
  //头部title
  public headerTitle: string;
  // public leftMenuList: Array<any> = [];
  //侧导航
  public visible: boolean = false;

  // title信息还是logo信息
  @Input() iconLogo: boolean = false;
  // 头部文字
  @Input() headerText: string = '';
  // 当前同一个路由的title信息如果是
  @Input() commonRouteTitle: string = '';
  // 左侧icon显示
  @Input() leftIcon: boolean = false;
  // 返回键中默认到首页，默认为false
  @Input() goHome: boolean = false;
  // 显示试玩
  @Input() tryGame: boolean = false;
  // 某些页面需要单独处理返回首页
  public needGoHome: boolean = false;
  //控制激活用户跳转修改密码页面后退返回到首页
  public HeaderGoIsKey: any = {
    'isGoHome': false
  };
  private goHomeArr: any = ['live', 'register'];

  constructor(
    public activatedRoute: ActivatedRoute,
    public plat: PlatformService,
    public configService: ConfigService,
    public common: CommonService,
    public router: Router,
    public activity: ActivityService,
    public location: Location,
    public game: GameService,
    public message: NzMessageService,
    public auth: AuthenticationService,
  ) {
    // 处理页面title在路由data{title:''}中配置
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'), // 过滤出未命名的outlet，<router-outlet>
      mergeMap(route => route.data)
    ).subscribe((ctx) => {
      window.scrollTo(0, 0);
      this.headerTitle = ctx.title || '';
      // 如果是公共页面的title就是用，离开页面之后处理title去掉service下面的title
      this.common.commonRouteTitle = '';
      // 单独处理路由返回上一级的循环模式
      const currentLink = this.location.path();
      this.needGoHome = this.goHomeArr.some(item => currentLink.indexOf(item) > -1);
    });
  }

  ngOnInit() {
    let GoH = JSON.parse(sessionStorage.getItem('GoHomeKey'));
    if (GoH) {
      this.HeaderGoIsKey = GoH
    }
  }

  onLeftClick() {
    //激活页面跳转过来的话 跳转到首页 否则跳转到上一页
    if (this.HeaderGoIsKey.isGoHome) {
      sessionStorage.removeItem('GoHomeKey');
      this.router.navigateByUrl('/m/home');
    } else {
      this.goHome || this.needGoHome ? this.router.navigateByUrl('/m/home') : history.go(-1);
    }
  }
}
