import { Component, OnInit } from '@angular/core';
import {CapitalService} from "@service/capital.service";
import {UserService} from "@service/user.service";
import {NzMessageService} from "ng-zorro-antd";
import {ConfigService} from "@src/app/config/config.service";
import {GameList, UserInfo} from '@src/app/types/common.type';

@Component({
  selector: 'app-mobile-all-assets',
  templateUrl: './mobile-all-assets.component.html',
  styleUrls: ['./mobile-all-assets.component.less']
})
export class MobileAllAssetsComponent implements OnInit {

    public isSpinning: boolean =  false;

    // 用户信息
    get userInfo(): UserInfo {
        return this.userService.userInfo;
    }

    // 所有游戏列表
    get allGameListInfo(): GameList[] {
      return this.capitalService.allGameListInfo;
    }

    constructor(
      public capitalService: CapitalService,
      public userService: UserService,
      public configService: ConfigService,
      public message: NzMessageService
    ) {}

    ngOnInit() {
        // 获取所有游戏列表信息
        this.capitalService.getAllGameListInfo().subscribe(res => {
        }, error => {
          console.log(error);
        }, () => {
          this.isSpinning = false;
        });
        // 获取用户信息
        this.userService.getUserInfo().subscribe();
    }

    // 一键回收
    oneRecycling(): void {
      this.isSpinning = true;
      this.capitalService.oneRecycling().subscribe(resp => {
        if (resp.status === 10000) {
          const { wallet } = resp.data;
          this.userService.userInfo.wallet = wallet;
          this.message.success(resp.msg);
        } else {
          this.message.error(resp.msg);
        }
      }, error => {
          this.message.error(error.statusText);
      }, () => {
          this.isSpinning = false;
      });
    }
}
