import {Component, OnInit} from '@angular/core';
import {UserService} from "@service/user.service";
import {ConfigService} from "@src/app/config/config.service";
import {CapitalService} from "@service/capital.service";
import {NzMessageService} from "ng-zorro-antd";
import {GameList, ResponseBody, UserInfo} from '@src/app/types/common.type';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mobile-transfer-accounts',
  templateUrl: './mobile-transfer-accounts.component.html',
  styleUrls: ['./mobile-transfer-accounts.component.less']
})
export class MobileTransferAccountsComponent implements OnInit {
  // 抽屉的显示与隐藏
  public visible: boolean = false;
  // 是否是转出
  public isOut: boolean = true;

  // 转出平台
  public selectedOutValue: any;

  // 转入平台
  public selectedInValue: any;

  // 转账金额
  public transferBalance: any;

  //  是否加载中
  public isLoading: boolean = false;

  // 用户信息
  get userInfo(): UserInfo {
    return this.userService.userInfo;
  }

  // 所有游戏列表
  get allGameListInfo(): GameList[] {
    return this.capitalService.allGameListInfo;
  }

  constructor(
    public userService: UserService,
    public capitalService: CapitalService,
    public configService: ConfigService,
    public message: NzMessageService,
    public router: Router
  ) {
  }

  ngOnInit() {
    // 获取所有游戏列表信息
    this.isLoading = true;
    this.capitalService.getAllGameListInfo().subscribe(res => {
      if (res.status === 10000) {
        this.selectedOutValue = res.data[0];
        this.selectedInValue = res.data[1];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.isLoading = false;
    });
  }

  submit(): void {
    this.transferValidate();
  }

  /**
   * @author Merlin
   * @date 2019/8/7
   * @Description: 转入平台与转出平台点击确定是
   * @params: type
   * @return: undefined
   */
  openToggleDraw(type: string): void {
    this.visible = !this.visible;
    if (type === 'out') {
      this.isOut = true;
    } else if (type === 'in') {
      this.isOut = false;
    }
  }

  /**
   * 转出、转入选择框改变事件
   */
  changeSelectedPlate(item: any, i: number): void {
    this.visible = false;
    let firstList = this.allGameListInfo[0];
    // 中间过渡
    let middleInData = this.selectedInValue;
    let middleOutData = this.selectedOutValue;
    // 如果点击中心娱乐城就直接交换平台，阻止后续的执行
    if (i === 0) {
      this.selectedOutValue = middleInData;
      this.selectedInValue = middleOutData;
      return;
    }
    if (this.isOut) {
      this.selectedOutValue = item;
      this.selectedInValue = firstList;
    } else {
      this.selectedOutValue = firstList;
      this.selectedInValue = item;
    }
  }

  /**
   * 表单验证
   */
  transferValidate() {
    const {selectedOutValue, selectedInValue, transferBalance} = this;
    let selectIntGameCode = selectedInValue.gameCode;
    let selectOuGameCode = selectedOutValue.gameCode;
    if (transferBalance === undefined) {
      this.message.warning('请输入转账金额');
      return;
    }
    let isTransferTo: boolean = selectOuGameCode === '0';
    if (isTransferTo) {
      this.transfer(isTransferTo, transferBalance, selectIntGameCode);
    } else {
      this.transfer(isTransferTo, transferBalance, selectOuGameCode);
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
    this.capitalService.doTransfer(type, amount, gameCode).subscribe(
      (resp: ResponseBody) => {
        if (resp.status === 10000) {
          this.router.navigate(['/m/capital/transferAccounts/success']);
          this.transferBalance = '';
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
