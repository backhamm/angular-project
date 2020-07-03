import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '@service/game.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from "@src/app/config/config.service";
import {NavGameInfo, ResponseBody} from "@src/app/types/common.type";

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.less']
})
export class ElectronicsComponent implements OnInit, OnDestroy, AfterViewInit {
  //banner背景图片
  public bannerImage: string = `${this.config.baseImgUrl}/images/games_banner/slots_banner.jpg`;
  public prev_left: string = `${this.config.baseImgUrl}images/prev-hover.png`;
  public prev_right: string = `${this.config.baseImgUrl}images/next-hover.png`;
  public secondTab: NavGameInfo[] = []; // 游戏列表
  //三级菜单
  public thirdTab: NavGameInfo[] = [];
  //四级游戏(所有)
  public allForthList: NavGameInfo[] = [];
  //四级列表(当前页)
  public fourthTab: NavGameInfo[] = [];
  public noticeList = [1, 1, 1];
  //搜索关键字
  public keyWord: string = '';
  //分页
  public pageData: any = {
    current: 1,
    size: 20,
    total: 0,
    pageNum: 0,
  };

  offset = 0; //偏移
  ulWidth = 0; //ul的长度
  TabState = 0; // 二级列表选中状态
  thirdTabState = 0; // 三级列表选中状态
  // 当前选中的二级id搜索查询
  public secondId: number;
  // Observable取消订阅
  private getListSubscribe;
  private getCurListSubscribe;

  constructor(
    public service: GameService,
    public message: NzMessageService,
    public route: ActivatedRoute,
    public config: ConfigService
  ) {
    this.getListSubscribe = this.service.currentGameList.subscribe(res => {
      this.secondTab = res;
      this.secondId = this.secondTab[0].id;
      // ul的长度
      this.ulWidth = this.secondTab.length * 100;
      if (this.secondTab.length > 0) {
        this.getThirdTab(res[this.service.elecIndex].id);
        this.setMoving(this.service.elecIndex, true);
      }
    });
    this.getCurListSubscribe = this.service.elecSubject.subscribe((i: number) => {
      // 二级点击
      this.secondClick(i);
      // 修改滚动条
      this.setMoving(i, true);
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  updateOffsetLeft(index) {

    if (this.secondTab.length > 6) {
      if (index === 1) {
        // 到最左边
        if (this.offset < 0) {
          this.offset += 100;
        }
      } else {

        // 到右最边
        if (this.offset > -(this.ulWidth - 600)) {
          this.offset -= 100;
        }
      }
    }
  }

  getThirdTab(id: number): void {
    this.service.getMenuList(id).subscribe((res: ResponseBody) => {
      const {status, data} = res;
      if (status === 10000) {
        this.thirdTab = data[0].subMenus;
        if (this.thirdTab) {
          this.getFourthList(this.thirdTab[0].id);
        }

      }
    });
  }

  /**
   * @description: 获取四级列表
   * @author: table
   */
  getFourthList(id: number): void {
    this.service.getMenuList(id).subscribe((res: ResponseBody) => {
      const {status, data} = res;
      if (status === 10000) {
        this.allForthList = data[0].subMenus;
        this.pageData.total = this.allForthList.length;
        //重置参数
        this.pageData.current = 1;
        this.keyWord = '';
        // 获取当前页数据
        this.changeFourthTab();
      }
    });
  }

  /**
   * 更新页面信息
   */
  changeFourthTab() {
    this.pageData.pageNum = Math.ceil(this.pageData.total / this.pageData.size);
    const {current, size} = this.pageData;
    this.fourthTab = this.allForthList.slice((current - 1) * size, current * size);
  }

  /**
   * @description: 二级菜单点击事件
   */
  secondClick(index: number): void {
    setTimeout(() => {
      const tab = this.secondTab[index];
      const {gameCode, gameId, id, hasSub} = tab;
      //判定是否进入游戏
      if (!hasSub) {
        this.service.loadGame({gameCode, gameId});
        return;
      } else {
        this.secondId = tab.id;
        this.setMoving(index, false);
        this.service.elecIndex = index;
      }
      //更新三级菜单
      this.getThirdTab(id);
    }, 0);
  }

  // 点击移动
  setMoving(index, isNav: boolean = false) {
    let shiftNum = 100;
    if (isNav) {
      if (this.secondTab.length > 6) {
        if (-(index * 100) < -(this.ulWidth - 600)) {
          this.offset = -(this.ulWidth - 600);
        } else {
          this.offset = -(index * 100);
        }

      }
    } else {
      if (this.service.elecIndex !== index && this.secondTab.length > 6) {
        if (this.service.elecIndex < index) {
          if (this.offset - shiftNum < -(this.ulWidth - 600)) {
            this.offset = -(this.ulWidth - 600);
          } else {
            this.offset -= shiftNum;
          }
        } else {
          if (this.offset + shiftNum >= 0) {
            this.offset = 0;
          } else {
            this.offset += shiftNum;
          }
        }
      }
    }

  }

  /**
   * @description: 三级菜单点击事件
   * @author: table
   */
  thirdClick(index: number, list): void {
    this.thirdTabState = index;
    //更新四级列表
    this.getFourthList(index);
  }

  /**
   * @description: 搜索游戏
   * @author: table
   */
  searchGame(): void {
    const {keyWord, secondId} = this;
    if (keyWord === '') {
      return;
    }
    this.service.getSearchForthList({menuName: keyWord, id: secondId}).subscribe((res: ResponseBody) => {
      const {data, status} = res;
      if (status === 10000) {
        this.allForthList = data;
        this.pageData.total = this.allForthList.length;
        this.pageData.current = 1;
        // 获取当前页数据
        this.changeFourthTab();
      }
    });
  }


  /**
   * @description: 当搜索框为空 => 回到之前状态
   */
  changeKeyWord(value: any): void {
    if (value === '') {
      //重置参数
      this.pageData.current = 1;
      //更新四级列表
      this.getFourthList(this.thirdTabState);
    }
  }

  // 分页点击 index  1:下一页 2：上一页 3：首页 4：尾页
  pageNext(index) {
    if (index === 1) {
      this.pageData.current += 1;
      if (this.pageData.current > this.pageData.pageNum) {
        this.pageData.current = this.pageData.pageNum;
      }
    } else if (index === 2) {
      this.pageData.current -= 1;
      if (this.pageData.current <= 0) {
        this.pageData.current = 1;
      }
    } else if (index === 3) {
      this.pageData.current = 1;
    } else {
      this.pageData.current = this.pageData.pageNum;
    }
    this.changeFourthTab();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.service.elecIndex = 0;
    this.getListSubscribe.unsubscribe();
    this.getCurListSubscribe.unsubscribe();
  }
}
