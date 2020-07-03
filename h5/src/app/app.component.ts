import {Component} from '@angular/core';
import {UserService} from '@service/user.service';
import {AuthenticationService} from '@service/authentication.service';
import {CommonService} from '@service/common.service';
import {ConfigService} from "@src/app/config/config.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	constructor(
		public auth: AuthenticationService,
		public user: UserService,
		public config: ConfigService,
		public common: CommonService
	) {
		/**
		 * 如果有登录状态，用户信息为空，则获取用户信息
		 * 主要防止刷新
		 */
		if (this.auth.isAuth && !this.user.userInfo) {
			this.user.getUserInfo().subscribe();
		}
		/**
		 *  代理信息
		 */
		this.common.initProxy();
		// 处理兼容禁止缩放功能
		this.dealBrower();
		this.createIcon();
	}

	dealBrower() {
		//解决safari自带放大功能：阻止双击放大
		let lastTime = 0;
		document.addEventListener('touchstart', function (event) {
			if (event.touches.length > 1) {
				event.preventDefault();
			}
		});
		document.addEventListener('touchend', function (event) {
			const nowTime = (new Date()).getTime();
			if (nowTime - lastTime <= 300) {
				event.preventDefault();
			}
			lastTime = nowTime;
		}, false);

		// 解决safari自带放大功能：阻止双指放大
		document.addEventListener('gesturestart', function (event) {
			event.preventDefault();
		});
	}
  createIcon() {
    let doc = document;
    let link = doc.createElement("link");
    link.setAttribute("rel", "Shortcut Icon");
    link.setAttribute("type", "image/x-icon");
    link.setAttribute("href", `${this.config.baseMobileImgUrl}image/favicon.ico`);
    let heads = doc.getElementsByTagName("head");
    heads[0].appendChild(link);

  }
}
