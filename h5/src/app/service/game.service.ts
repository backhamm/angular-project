import {Injectable} from '@angular/core';
import {Request} from '@src/app/http/request';
import {ConfigService} from '@src/app/config/config.service';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {CommonService} from './common.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {Loading} from "@src/app/util/loading";
import {ResponseBody, NavGameInfo, GeTab, LoadParams} from '@src/app/types/common.type';
import {AuthenticationService} from '@service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // 所有游戏列表
  public navGameList: NavGameInfo[] = [];
  // 首页推荐
  public recommendList: NavGameInfo[] = [];
  // 免费试玩
  public freeList: NavGameInfo[] = [];


  // 进入游戏加载loading
  public isSpinning: boolean = false;

  constructor(
    public request: Request,
    public config: ConfigService,
    public auth: AuthenticationService,
    public common: CommonService,
    public message: NzMessageService,
    public router: Router,
    public loading: Loading
  ) {
  }

  /**
   * 获取一级二级导航列表
   * @ return {Observable<any>}
   */
  getNavList(): Observable<any> {
    // 如果有数据不调用接口
    if (this.navGameList.length) {
      return of(this.navGameList);
    }
    return this.getMenuList(0).pipe(
      map((res: ResponseBody) => {
        if (res.status === 10000) {
          const {data} = res;
          const recommend = res.data.filter((item: NavGameInfo) => item.viewType === '2');
          const freeList = res.data.filter((item: NavGameInfo) => item.viewType === '3');
          // 热门推荐
          this.recommendList = recommend.length && recommend[0].subMenus || [];
          this.freeList = freeList.length && freeList[0].subMenus || [];
          // 游戏列表
          this.navGameList = data.filter((item: NavGameInfo) => item.viewType === '1');
          return this.navGameList;
        }
      }));
  }

  getMenuList(id: number): Observable<any> {
    return this.request.get('unauthor/sys/menu', {id});
  }

  /**
   * @author merlin
   * @date 2020/3/18
   * @Description: 查询四级数据
   * @params:
   */
  getSearchForthList(params: any): Observable<ResponseBody> {
    return this.request.get('unauthor/sys/search', params);
  }

  /**
   * @description: 进入游戏
   * @author: table  h5进入游戏
   * @return: Observable<any>
   */
  loadMobileGame(params: LoadParams): any {
    //判断登录
    if (!this.auth.isAuth) {
      this.message.warning('请先登录!');
      return this.router.navigate(['/m/login']);
    }
    this.isSpinning = true;
    this.request.post('game/forward', params).pipe(
      map(res => {
        if (res.status === 10000) {
          window.location.href = res.data.data;
        } else {
          this.message.error(res.msg);
          if (res.status === 20004) {
            this.router.navigate(['/m/login']);
          }
        }
      })
    ).subscribe(null, null, () => this.isSpinning = false);
  }

  loadMobileFreeGame(params: LoadParams): any {
    //判断登录
    // if (this.auth.isAuth) {
    //   this.message.error('请退出登录进行游戏');
    // }
    this.request.get('unauthor/game/fun/forward', params).pipe(
      map(res => {
        if (res.status === 10000) {
          window.location.href = res.data.data;
        } else {
          this.message.error(res.msg);
        }
      })
    ).subscribe(null, null, () => this.isSpinning = false);
  }
}



