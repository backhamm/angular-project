import { Component, OnInit } from '@angular/core';
import {UserService} from '@src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import {PlatformService} from "@service/platform.service";
import {ResponseBody} from "@src/app/types/common.type";
import {Validate} from '@src/app/util/validate';

@Component({
  selector: 'app-center-info',
  templateUrl: './center-info.component.html',
  styleUrls: ['./center-info.component.less']
})
export class CenterInfoComponent implements OnInit {
    //设定状态
    public current: number = 0;
    public title: object = {
      // title: 显示标题； reg: 验证使用字段； params: 接口传参字段
      '1': { title: '真实姓名', reg: 'realName', params: 'realname'},
      '2': { title: '微信号码', reg: 'weChat', params: 'weixin'},
      '3': { title: 'QQ号码', reg: 'qq', params: 'qq'}
    };
    //获取路由id
    public id: string = '';
    //用户要修改的项目
    public currentInfo: {title: string, reg: string, params: string } = null;
    //用户输入的内容
    public userSetContent: string = '';
    constructor(
           public user: UserService,
           public route: ActivatedRoute,
           public message: NzMessageService,
           public platform: PlatformService,
           public validate: Validate
    ) {
    }

    ngOnInit() {
        // 初始化当前修改的项目
        this.id = this.route.snapshot.paramMap.get('id');
        this.currentInfo = this.title[this.id];
    }

    //提交修改的内容
    next(): void {
      const params = {
          type : this.id,
          [this.currentInfo.params]: this.userSetContent
      };
      // 验证
      if (!this.validate.singleValidateFn(this.currentInfo.reg, this.userSetContent)) {
         return;
      }
      this.user.changeUserInfo(params).subscribe((res: ResponseBody) => {
          if (res.status === 10000) {
            this.current = 1;
            this.message.success(res.msg);
          } else {
            this.message.error(res.msg);
          }
      });
    }
}
