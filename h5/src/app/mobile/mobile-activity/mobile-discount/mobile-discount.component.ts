import {Component, OnInit} from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";
import {WebComConfig} from "@src/app/types/common.type";
import {CommonService} from "@service/common.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mobile-discount',
  templateUrl: './mobile-discount.component.html',
  styleUrls: ['./mobile-discount.component.less']
})
export class MobileDiscountComponent implements OnInit {

  public discountList: Array<WebComConfig> = [];   // 优惠列表
  public showNull: boolean = false;       // 没有优惠需要显示的页面
  public isShow: Array<any> = [];         // 当前需要显示的优惠详情(手风琴效果)
  public isLoading: boolean = false;
  public detailID = null;

  constructor(
    public baseConfig: ConfigService,
    public common: CommonService,
    public route: ActivatedRoute
  ) {
  }

  showMain(e, i) {
    if (!this.isShow[i]) {
      e.target.nextSibling.style.height = e.target.nextSibling.firstChild.height + 'px';
    } else {
      e.target.nextSibling.style.height = 0;
    }
    this.isShow.forEach((el, index, arr) => {
      if (index !== i) {
        arr[index] = false;
        document.getElementsByClassName('discount-main')[index].setAttribute('style', 'height: 0');
      }
    });
    this.isShow[i] = !this.isShow[i];
  }

  init() {
    let list = [];
    this.common.getWebcom().subscribe(({status, data}) => {
      if (status === 10000) {
        list = data.filter(item => Number(item.type) === 4);
        this.discountList = (list.length && list[0].configs) || [];
        this.showNull = !this.discountList.length;
        this.isShow = this.discountList.map(() => false);
      }
    });

    this.detailID = this.route.snapshot.queryParams['id'];
  }

  ngOnInit() {
    this.init();
  }
}
