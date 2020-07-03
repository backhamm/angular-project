import {Component, OnInit} from '@angular/core';
import {CapitalService} from "@service/capital.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {UserService} from "@service/user.service";
import {ConfigService} from "@src/app/config/config.service";

@Component({
  selector: 'app-mobile-proxy-notjoin',
  templateUrl: './mobile-proxy-notjoin.component.html',
  styleUrls: ['./mobile-proxy-notjoin.component.less']
})
export class MobileProxyNotjoinComponent implements OnInit {

  carouselList = [];

  constructor(
    public capital: CapitalService,
    public router: Router,
    public message: NzMessageService,
    public user: UserService,
    public config: ConfigService
  ) {
  }

  ngOnInit() {
    this.init();
  }

  joinAgent() {
    this.capital.joinAgent().subscribe(res => {
      if (res.status === 10000) {
        this.message.success(res.msg);
        this.user.userInfo.hasJoin = 0;
      } else {
        this.message.error(res.msg);
      }
    });
  }

  init() {
    this.capital.getAgencyCarousel().subscribe(res => {
      if (res.status === 10000) {
        this.carouselList = [...res.data, ...res.data.slice(0, 2)];
      }
    });
  }

}
