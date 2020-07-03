import {Component, OnInit} from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";
import {IntagralService} from "@service/intagral.service";
import {UserService} from "@service/user.service";
import {AuthenticationService} from "@service/authentication.service";
import {Router} from "@angular/router";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-mobile-integral',
  templateUrl: './mobile-integral.component.html',
  styleUrls: ['./mobile-integral.component.less']
})
export class MobileIntegralComponent implements OnInit {
  conversionList = [];
  hotGoods = [];
  goodsList = [];
  isLoading = 0;

  constructor(
    public config: ConfigService,
    public integral: IntagralService,
    public user: UserService,
    public auth: AuthenticationService,
    public router: Router,
    public message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.conversionList = [...this.integral.leftData, ...this.integral.leftData.slice(0, 3)];
    this.integral.getHotGood().subscribe(res => {
      const {status, data} = res;
      if (status === 10000) {
        this.hotGoods = data;
      }
      this.isLoading++;
    });
    this.integral.getGoods({pageNo: 1, pageSize: 1000, terminal: '1'}).subscribe(res => {
      this.goodsList = res.list;
      this.isLoading++;
    });
  }

  goLogin() {
    this.message.warning('请先登录');
    this.router.navigate(['/m/login']);
  }

  goSubPage() {
    if (this.auth.isAuth) {
      this.router.navigate(['/m/integral/subpage/0']);
    } else {
      this.message.create('warning', '请先登录！');
      this.router.navigate(['/m/login']);
    }
  }
}
