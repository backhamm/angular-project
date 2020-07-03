import {Component, OnInit} from '@angular/core';
import {CapitalService} from "@service/capital.service";
import {NzMessageService} from "ng-zorro-antd";
import {UserService} from "@service/user.service";
import {Capital} from "@src/app/pc/center/components/capital-interchange/models/model";
import {ResponseBody,UserInfo} from "@src/app/types/common.type";

@Component({
    selector: 'app-capital-interchange',
    templateUrl: './capital-interchange.component.html',
    styleUrls: ['./capital-interchange.component.less']
})
export class CapitalInterchangeComponent implements OnInit {

    constructor(
        public service: CapitalService, public message: NzMessageService,
        public user: UserService
    ) {}

    // 一键回收状态
    onClickState: boolean = false;

    // 资金相关数据
    capital: Capital;

    //  显示隐藏开关状态
    eyeShow: boolean = true;

    // 刷新按钮状态
    refreshLoading: boolean = false;

    ngOnInit() {
      // 获取所有游戏列表信息
      this.service.getAllGameListInfo().subscribe();
      // 个人资金数据
    //   this.getCapital();
    }

    // 用户信息
    get userInfo(): UserInfo {
        return this.user.userInfo;
    }




    // 一键回收
    oneClickRecycling(): void {
        this.onClickState = true;
        this.service.oneRecycling().subscribe((resp: ResponseBody) => {
            if (resp.status === 10000) {
                const { wallet } = resp.data;
                this.user.userInfo.wallet = wallet;
                this.message.success(resp.msg);
            } else {
                this.message.error(resp.msg);
            }
        }, error => {
            this.message.error(error.statusText);
        }, () => {
            this.onClickState = false;
        });
    }

    // 单平台回收
    recyclingByPlatCode(platCode: string, balance: number): void {
        if (balance === 0) {
          this.message.error("暂无余额回收");
          return;
        }
        this.refreshLoading = true;
        this.service.recyclingByCode(platCode).subscribe(
            (resp: ResponseBody) => {
                if (resp.status === 10000) {
                    const {wallet} = resp.data;
                    this.user.userInfo.wallet = wallet;
                    this.message.success(resp.msg);
                } else {
                    this.message.error(resp.msg);
                }
            }, error => {
                this.message.error(error.statusText);
            }, () => {
                this.refreshLoading = false;
            }
        );
    }

    // 刷新数据
    refresh(): void {
        this.refreshLoading = true;
        this.service.updateCapitalList().subscribe(resp => {
        }, error => {
          console.log(error);
        }, () => {
          this.refreshLoading = false;
        });
    }

}
