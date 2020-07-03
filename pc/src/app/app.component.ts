import {Component} from '@angular/core';
import {UserService} from '@service/user.service';
import {AuthenticationService} from '@service/authentication.service';
import {CommonService} from '@service/common.service';
import {ConfigService} from './config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    public auth: AuthenticationService,
    public user: UserService,
    public common: CommonService,
    public config: ConfigService
  ) {
    /**
     * 如果有登录状态，用户信息为空，则获取用户信息
     * 主要防止刷新
     */
    if (this.auth.isAuth && !this.user.userInfo) {
      this.user.getUserInfo().subscribe();
    }
    /**
     *  代理信息并判断是否为手机端
     */
    this.common.initProxy();
    this.createIcon();
  }

  createIcon() {
    let doc = document;
    let link = doc.createElement("link");
    link.setAttribute("rel", "Shortcut Icon");
    link.setAttribute("type", "image/x-icon");
    link.setAttribute("href", `${this.config.baseImgUrl}images/favicon.ico`);
    let heads = doc.getElementsByTagName("head");
    heads[0].appendChild(link);

  }
}
