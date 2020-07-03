import {Component, OnInit} from '@angular/core';
import {UserService} from "@service/user.service";
import {CapitalService} from "@service/capital.service";
import {ConfigService} from "@src/app/config/config.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {GameList, ResponseBody, UserInfo} from '@src/app/types/common.type';

@Component({
    selector: 'app-capital-interchange-hand',
    templateUrl: './capital-interchange-hand.component.html',
    styleUrls: ['./capital-interchange-hand.component.less']
})
export class CapitalInterchangeHandComponent implements OnInit {

    constructor(
        public user: UserService, public service: CapitalService,
        public config: ConfigService, public message: NzMessageService,
        public router: Router,
    ) {}

    // 转出平台
    selectedOutValue: string;

    // 转入平台
    selectedInValue: string;

    // 转账金额
    transferBalance: any;

    //  是否加载中
    isLoading: boolean = false;

    // 用户信息
    get userInfo(): UserInfo {
        return this.user.userInfo;
    }
    // 所有游戏列表
    get allGameListInfo(): GameList[] {
      return this.service.allGameListInfo;
    }
    // 已点击游戏列表
    get playedGameList(): GameList[] {
      return this.service.playedGameList;
    }

    // 提取佣金显示隐藏
    commissionVisible: boolean = false;

    ngOnInit() {
      // 获取所有游戏列表信息
      this.service.getAllGameListInfo().subscribe((res: ResponseBody) => {
        if (res.status === 10000) {
          this.selectedOutValue = res.data[0].gameCode;
          this.selectedInValue = res.data[1].gameCode;
        }
      });
    }

    /**
     * @description: 提取佣金
     * @author: tables
     */
    getWithdrawComm(): void {
        let params = {
            amount: Number(this.userInfo.outstandingCommissions),
            commissionBeginDate: this.userInfo.commissionBeginDate,
            commissionEndDate: this.userInfo.commissionEndDate,
        };
        this.service.getWithdrawlComm(params).subscribe((res: ResponseBody) => {
            if (res.status === 10000) {
                this.message.success(res.msg);
                setTimeout(() => {
                    this.user.getUserInfo().subscribe();
                }, 1000);
            } else {
                this.message.error(res.msg);
                if (res.status === 40000) {
                    this.router.navigateByUrl('center/withdraw');
                }
            }
        });
    }

    /**
     * 转出、转入选择框改变事件
     */
    transferSelectChange(val, type) {
        let firstList = this.allGameListInfo[0].gameCode;
        let secondList = this.allGameListInfo[1].gameCode;
        if (type === 'out') {
          this.selectedInValue = val !== firstList ? firstList : secondList;
        } else if (type === 'in') {
          this.selectedOutValue = val !== firstList ? firstList : secondList;
        }
    }

    /**
     * 表单验证
     */
    transferValidate() {
        const {selectedOutValue, selectedInValue, transferBalance} = this;
        if (transferBalance === undefined) {
            this.message.warning('请输入转账金额');
            return;
        }
        let isTransferTo: boolean = selectedOutValue === '0';
        if (isTransferTo) {
            this.transfer(isTransferTo, transferBalance, selectedInValue);
        } else {
            this.transfer(isTransferTo, transferBalance, selectedOutValue);
        }
    }

    /**
     * 转账
     * @param {boolean} type
     * @param {number} amount
     * @param {string} gameCode
     */
    transfer(type: boolean, amount: number, gameCode: string) {
        this.isLoading = true;
        this.service.doTransfer(type, amount, gameCode).subscribe(
            (resp: ResponseBody) => {
                if (resp.status === 10000) {
                    this.message.success(resp.msg);
                    this.transferBalance = '';
                    // 获取所有游戏列表信息
                    if (type) {
                      this.service.getAllGameListInfo().subscribe((res: ResponseBody) => {
                        if (res.status === 10000) {
                          this.selectedOutValue = res.data[0].gameCode;
                          this.selectedInValue = res.data[1].gameCode;
                        }
                      });
                    } else {
                      this.service.getAllGameListInfo().subscribe((res: ResponseBody) => {
                        if (res.status === 10000) {
                          this.selectedOutValue = res.data[1].gameCode;
                          this.selectedInValue = res.data[0].gameCode;
                        }
                      });
                    }
                } else {
                    this.message.error(resp.msg);
                }
            }, error => {
                this.message.error(error.statusText);
            }, () => {
                this.isLoading = false;
            }
        );
    }
}
