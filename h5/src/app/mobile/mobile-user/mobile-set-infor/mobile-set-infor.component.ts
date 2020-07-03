import {Component, OnInit} from '@angular/core';
import {UserService} from "@src/app/service/user.service";
import {ActivatedRoute} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {CommonService} from '@src/app/service/common.service';
import {_Reg} from "@src/app/util/validate";
import {ResponseBody} from "@src/app/types/common.type";
import {Location} from "@angular/common";

@Component({
  selector: 'app-mobile-set-infor',
  templateUrl: './mobile-set-infor.component.html',
  styleUrls: ['./mobile-set-infor.component.less']
})
export class MobileSetInforComponent implements OnInit {
  //用户输入的内容
  public userSetContent: string = '';
  public headerText = ['真实姓名', '微信号', 'QQ号'];
  mapData: any = {
    // 数组 0映射正则，1映射后台参数
    '1': ['realName', 'realname'],
    '2': ['weChat', 'weixin'],
    '3': ['qq', 'qq'],
  }
  //获取路由id
  public type: any = '';
  //设置显示状态内容
  public success: boolean = false;
  constructor(public route: ActivatedRoute,
              public message: NzMessageService,
              public router: Router,
              public user: UserService,
              public location: Location,
              public common: CommonService
  ) {

  }
  public reg: any;
  ngOnInit() {
    this.getId();
  }

  getId(): void {
    this.type = this.route.snapshot.paramMap.get('id');
    this.reg =  _Reg[this.mapData[this.type][0]];
  }

  // 输入验证
  regParams() {
    const { reg, message } = this.reg;
    if (reg.test(this.userSetContent)) {
      return true;
    } else {
      this.message.error(message);
      return false;
    }

  }

  //提交修改的内容
  next(): void {
    if (this.regParams()) {

      let params = {
        type: this.type,
      };
      // 获取当前的参数是那个属性值
      params[this.mapData[this.type][1]] = this.userSetContent;
      this.user.changeUserInfo(params).subscribe((res: ResponseBody) => {
        if (res.status === 10000) {
          this.success = true;
          this.message.success(res.msg);
          this.location.back();
        } else {
          this.message.error(res.msg);
        }
      });

    }

  }
}
