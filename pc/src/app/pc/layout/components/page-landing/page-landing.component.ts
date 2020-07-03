import { Component, OnInit } from '@angular/core';
import { PlatformService } from '@service/platform.service';
import { NzModalService } from 'ng-zorro-antd';
import { GameService } from '@service/game.service';
import { AuthenticationService } from "@service/authentication.service";
import { UserService } from "@service/user.service";
import { CommonService } from "@service/common.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _Reg } from "@src/app/util/validate";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ConfigService } from '@src/app/config/config.service';
@Component({
  selector: 'app-page-landing',
  templateUrl: './page-landing.component.html',
  styleUrls: ['./page-landing.component.less']
})
export class PageLandingComponent implements OnInit {
  //
  routerPath: string = "";

  validateForm: FormGroup;
  loading = false;
  public _Reg = _Reg;

  nzTabPosition = 'left';
  selectedIndex = 0;
  //控制页面登录显示隐藏
  Pagehide: boolean = true;
  constructor(
    public service: PlatformService,
    public modal: NzModalService,
    public game: GameService,
    public auth: AuthenticationService,
    public common: CommonService,
    private fb: FormBuilder,
    private user: UserService,
    public modalService: NzModalService,
    public router: Router,
    public route: ActivatedRoute,
    public config: ConfigService,
  ) {
     //同时具有监听的功能  控制页面登录框显示隐藏
    this.router.events.subscribe((data) => {
      //data返回一堆路由事件，所有得筛选自己需要的，这里选择路由导航结束之后
      if (data instanceof NavigationEnd) {
        this.routerPath = data.url.substr(1);
        if (this.routerPath.indexOf('center') != -1 || this.routerPath.indexOf('register') != -1|| this.routerPath.indexOf('download') != -1|| this.routerPath.indexOf('activity/red') != -1 || this.routerPath.indexOf('integral/integralRule') != -1) {
          this.Pagehide = false
        } else {
          this.Pagehide = true

        }
      }
    })
   }
 
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, , Validators.pattern(_Reg.username.reg)]],
      password: [null, [Validators.required, , Validators.pattern(_Reg.password.reg)]],
      // remember: [true]
    });
  }
  //登录
  submitForm(): void {
    const { value, valid } = this.validateForm;
    this.loading = true;
    if (valid) {
      this.auth.login(value).subscribe(res => {
        if (res.status === 10000) {
          this.loading = false;

          setTimeout(() => {
            //控制登录弹框的隐藏
            this.common.loginModalVisible = false;
          }, 10);
        }
      },
        error => {
          this.modal.error(error.toString());
        }, () => {
          this.loading = false;
        });
    }
  }
  /**
    * 登出
    */
  loginOut() {
    this.modalService.confirm({
      nzTitle: '系统提示',
      nzContent: '<b>是否要退出账户</b>',
      nzOnOk: () => {
        this.auth.logout();
      }
    });
  }
  subClick(data: any, link: string) {
    if (data.subMenus && data.subMenus.length) {
      this.router.navigate([link]);
    } else {
      this.game.loadGame({ gameCode: data.gameCode, gameId: data.gameId });
    }
  }

}
