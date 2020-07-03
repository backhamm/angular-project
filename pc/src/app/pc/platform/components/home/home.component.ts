import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@src/app/config/config.service';
import { PlatformService } from '@service/platform.service';
import { NzModalService } from 'ng-zorro-antd';
import { GameService } from '@service/game.service';
import { AuthenticationService } from "@service/authentication.service";
import { WebComConfig } from "@src/app/types/common.type";
import { CommonService } from "@service/common.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  
  loading = false;
  //弹窗
  isVisible: boolean = true;
  //不再提示
  isChecked: boolean = false;
  //弹窗左侧tab切换
  tabs: Array<{ name: string; content: string }> = [];
  nzTabPosition = 'left';
  selectedIndex = 0;

  /* tslint:disable-next-line:no-any */
  log(args: any[]): void { }

  constructor(
    public config: ConfigService,
    public service: PlatformService,
    public modal: NzModalService,
    public game: GameService,
    public auth: AuthenticationService,
    public common: CommonService,
  ) { }

  // 公告
  get noticeList() {
    const noticeArr = this.service.webComConfig.filter(item => !item || item.type === '6');
    return noticeArr.length ? noticeArr[0].configs : [];
  }

  // 轮播
  get carouselList() {
    const configArr = this.service.webComConfig.filter(item => !item || item.type === '1');
    return configArr.length ? configArr[0].configs : [];
  }

  // 热门推荐
  get hostList() {
    return this.game.recommendList;
  }

  /**
   *  精品大促
   */
  get imgList() {
    const imgListArr = this.service.webComConfig.filter(item => !item || item.type === '4');
    return imgListArr.length ? imgListArr[0].configs : [];
  }

  // 公告弹框
  noticeAlert(item: WebComConfig): void {
    const { data, title } = item;
    this.modal.info({
      nzTitle: title,
      nzContent: data
    });
  }

  //首页公告
  get indexDailoglList() {
    const indexDailogArr = this.service.webComConfig.filter(item => !item || item.type === '5');
    let pathname = window.location.pathname;
    if (pathname === '/' || pathname === '/home/index') {
      if (sessionStorage.getItem('index-dailog')) {
        this.isVisible = false;
      }
    }
    return indexDailogArr.length ? indexDailogArr[0].configs : [];
  }

  // ngOnInit() {}

  //弹窗方法
  handleCancel(): void {
    this.isVisible = false;
  }
  //不再提示
  closeIndexDailog(): void {
    if (this.isChecked) {
      sessionStorage.setItem('index-dailog', 'true');
      this.isVisible = false;
    }
  }
  //

  ngOnInit(): void {
  }
  //首页滚动公告弹框
  clickStart(val: string) {
      this.common.noticeAlert(val);
  }
}