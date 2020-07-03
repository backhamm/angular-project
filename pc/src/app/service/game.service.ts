import {Injectable} from '@angular/core';
import {Request} from '@src/app/http/request';
import {ConfigService} from '@src/app/config/config.service';
import {Observable, Subject} from 'rxjs';
import {CommonService} from './common.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {Loading} from "@src/app/util/loading";
import {ResponseBody, NavGameInfo, LoadParams} from '@src/app/types/common.type';
import {AuthenticationService} from '@service/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    // 游戏加载loading
    public gameLoading = true;
    // 所有游戏列表
    public navGameList: NavGameInfo[] = [];
    // 当前选择游戏列表
    public currentGameList: Subject<NavGameInfo[]> = new Subject();
    public currentGameListLength: number = 0;
    // 首页推荐
    public recommendList: NavGameInfo[] = [];
    //免费试玩
    public tryGameLists: NavGameInfo[] = [];
    // 电子索引值
    public elecIndex = 0;
    // 观察者
    public elecSubject: Subject<any> = new Subject();

    constructor(
        public request: Request,
        public config: ConfigService,
        public auth: AuthenticationService,
        public common: CommonService,
        public message: NzMessageService,
        public router: Router,
        public loading: Loading
    ) {
        this.getMenuList(0).subscribe(res => {
                if (res.status === 10000) {
                    // 热门推荐
                    const host = res.data.filter(item => item.viewType === '2');
                    host.length > 0 && (this.recommendList = host[0].subMenus);

                    // 游戏列表
                    const gameList = res.data.filter(item => item.viewType === '1');
                    this.navGameList = this.common.localRouteLink(gameList);

                    //免费试玩
                    const tryGameList = res.data.filter(item => item.viewType === '3');
                    tryGameList.length > 0 && (this.tryGameLists = tryGameList[0].subMenus);

                    // 根据当前路由 => 初始化当前游戏菜单 (用于首次进入或刷新页面)
                    const path = window.location.pathname.split('/');
                    let url = path[path.length - 1];
                    url === 'index' && (url = 'home');
                    this.navList(url);
                } else {
                    this.message.error(res.msg);
                }
            }, error => console.log(error.toString()),
            () => {
                this.gameLoading = false;
            });
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
     * @description: 获取二级菜单
     * @return: 当前路由二级菜单
     */
    navList(url: string): void {
        const currentList = this.navGameList.find((value: any) => url === value.url);
        // 异步处理数据同步问题
        setTimeout(() => {
            if (!!currentList) {
                const subMenus = currentList.subMenus;
                this.currentGameList.next(subMenus);
                this.currentGameListLength = subMenus && subMenus.length || 0;
            }
        }, 0);
    }

    // 触发电子事件
    changeElecIndex(i: number) {
        this.elecIndex = i;
        this.elecSubject.next(i);
    }

    /**
     * @description: 进入游戏-PC
     */
    loadGame(params: LoadParams): void {
        //判断登录
        if (!this.auth.isAuth) {
            this.common.loginModalVisible = true;
            return;
        }
        this.loading.openWindow();
        this.request.post('game/forward', params).subscribe(
            res => {
                if (res.status === 10000) {
                    this.loading.txWindow.location.href = res.data.data;
                } else {
                    this.message.error(res.msg);
                    this.loading.txWindow.close();
                    if (res.status === 20004) {
                        this.common.loginModalVisible = true;
                    }
                }
            });
    }

    //免费试玩
    tryGame(params: LoadParams): void {
        this.loading.openWindow();
        this.request.get('unauthor/game/fun/forward', params).subscribe(
            res => {
                if (res.status === 10000) {
                    this.loading.txWindow.location.href = res.data.data;
                } else {
                    this.message.error(res.msg);
                    this.loading.txWindow.close();
                }
            });
    }
}



