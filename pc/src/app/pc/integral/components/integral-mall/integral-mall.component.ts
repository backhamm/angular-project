import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ConfigService } from '@src/app/config/config.service';
import { IntagralService } from '@service/intagral.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService } from '@service/common.service';
import { UserService } from '@service/user.service';
import { AuthenticationService } from '@src/app/service/authentication.service';

@Component({
    selector: 'app-integral-mall',
    templateUrl: './integral-mall.component.html',
    styleUrls: ['./integral-mall.component.less']
})
export class IntegralMallComponent implements OnInit {

    //获取积分
    myIntegral: any;
    //左侧滚动数据
    public leftData: any[];
    //商品列表
    public goodList: any[] = [];
    //分页参数
    public pageData: any = {
        total: 1,
        current: 1,
        size: 12
    };
    // banner
    public bannerList: any = [
      {imgUrl: `${this.config.baseImgUrl}images/games_banner/PointsMall_banner.jpg`},
      {imgUrl: `${this.config.baseImgUrl}images/games_banner/PointsMall_banner_02.jpg`},
    ];
    //人气推荐商品数据
    public hotData: any = [];
    //显示隐藏兑换页面
    public detailModalShow: boolean = false;
    //兑换商品信息
    public goodData: any = {};

    constructor(
        public config: ConfigService,
        public service: IntagralService,
        public message: NzMessageService,
        public common: CommonService,
        public user: UserService,
        public auth: AuthenticationService,
        public router: Router


    ) { }

    ngOnInit() {
        this.leftData = this.service.leftData;
        this.getGoods();
        this.getHotGood();
        if (this.auth.isAuth) {
          this.getUserInfors();
        }
    }

  /**
   * @description: 获取用户积分 //获取用户积分
   * @author: zeal
   */
  getUserInfors(): void {
    this.user.getUserInfo().subscribe(res => {
      if (res.status === 10000) {
        const { data } = res;
        this.myIntegral = data.integral;
      } else {
        this.message.error(res.msg);
      }
    });
  }

    /**
     * @description: 请求列表数据
     * @author: table
     */
    getGoods(): void {
        let params = {
            pageNo: this.pageData.current,
            pageSize: this.pageData.size,
        };
        this.service.getGoods(params).subscribe((res: any) => {
            let scrollTops = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTops) {
              document.body.scrollTop = 1000;
              document.documentElement.scrollTop = 1000;
            }
            this.goodList = res.list;
            this.pageData.total = res.total;
            this.pageData.current = res.pageNo;
        });
    }
    /**
     * @description: 获取人气推荐商品
     * @author: table
     */
    getHotGood(): void {
        this.service.getHotGood().subscribe((res: any) => {
            if (res.status === 10000) {
                this.hotData = res.data;
            } else {
                this.message.error(res.msg);
            }

        });
    }
    /**
     * @description: 兑换商品详情
     * @author: table
     * @param {number} index 点击下标
     */
    getGoodDetail(index: number): void {
        //判定登录
        if (!this.auth.isAuth) {
            this.common.loginModalVisible = true;
            return;
        }

        //获取用户积分 //获取用户积分
        this.user.getUserInfo().subscribe(res => {
            if (res.status === 10000) {
                const { data } = res;
                let integral: any = data.integral;
                //传参
                this.goodData = this.goodList[index];
                Object.assign(this.goodData, { integral: integral });
                this.detailModalShow = true;
            } else {
                this.common.loginModalVisible = true;
                return;
            }
        });
    }


  /**
   * @description: 兑换商品详情
   * @author: table
   * @param {number} index 点击下标
   */
  getGoodHots(index: number): void {
    //判定登录
    if (!this.auth.isAuth) {
      this.common.loginModalVisible = true;
      return;
    }

    //获取用户积分 //获取用户积分
    this.user.getUserInfo().subscribe(res => {
      if (res.status === 10000) {
        const { data } = res;
        let integral: any = data.integral;
        //传参
        this.goodData = this.hotData[index];
        Object.assign(this.goodData, { integral: integral });
        this.detailModalShow = true;
      } else {
        this.common.loginModalVisible = true;
        return;
      }
    });
  }

    /**
     * @description: 隐藏详情框
     * @author: table
     */
    hideModal(val: boolean): void {
        this.detailModalShow = val;
    }

  /**
   * @description: 订单详情跳转
   * @author: zeal
   */
    routerRecod(): void {
      //判定登录
      if (!this.auth.isAuth) {
          this.common.loginModalVisible = true;
          return;
        } else {
          this.router.navigate(['/integral/integralRecord']);
      }
    }
}
