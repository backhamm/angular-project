import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@src/app/service/authentication.service';
import {GameService} from "@service/game.service";
import {CommonService} from "@service/common.service";
import {ConfigService} from "@src/app/config/config.service";
import {PlatformService} from "@service/platform.service";

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.less']
})
export class MobileFooterComponent implements OnInit {

  public footerLinks = [
    { img: 'di_index.png', link: '/m/home', title: '首页', isAuth: 'both'},
    { img: 'di_more.png', link: '/m/game', title: '分类', isAuth: 'both'},
    { img: 'di_zhuce.png', link: '/m/register', title: '注册', isAuth: true},
    { img: 'di_cunkuan.png', link: '/m/capital/deposit', title: '存款', isAuth: false},
    { img: 'di_kf.png', link: '/m/customerService', title: '客服', isAuth: 'both'},
    { img: 'di_login.png', link: '/m/login', title: '登陆', isAuth: true},
    { img: 'di_user.png', link: '/m/memberCenter', title: '我的', isAuth: false},
  ];
  constructor(
    public auth: AuthenticationService,
    public game: GameService,
    public common: CommonService,
    public config: ConfigService,
    public platform: PlatformService,
  ) {
     this.footerLinks = this.footerLinks.filter( e => e.isAuth === 'both' || e.isAuth === !this.auth.isAuth);
  }

  ngOnInit() {
  }
}
