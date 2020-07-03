import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import {ResponseBody} from "@src/app/types/common.type";
import {UserService} from '@service/user.service';
@Component({
  selector: 'app-center-personal',
  templateUrl: './center-personal.component.html',
  styleUrls: ['./center-personal.component.less']
})
export class CenterPersonalComponent implements OnInit {

    constructor(  public user: UserService, public message: NzMessageService) { }

    // 获取用户信息
    get uerInfo () {
      return this.user.userInfo;
    }
    //用户银行卡号
    public bankInfo: { cardNum: string } = null;
    //加载状态
    public  loading: boolean = false;

    //用户修改跳转
    public src = {
        name: '/center/personalName/1',
        weixin: '/center/personalName/2',
        qq : '/center/personalName/3',
        withdrawal: '/center/drawalPassword',
        phone: '/center/userPhone',
        card: '/center/bankcard'
    };

    ngOnInit() {
        this.user.getUserInfo().subscribe();
        this.getUserCard();
    }


    // 银行卡信息
    getUserCard() {
      this.loading = true;
      this.user.getUserCard().subscribe( (res: ResponseBody) => {
          if (res.status === 10000) {
              this.bankInfo = res.data;
          }
      }, error => {
        console.log(error);
      }, () => {
        this.loading = false;
      });
    }
}
