import {ChangeDetectorRef, Component, OnInit, enableProdMode} from '@angular/core';
import {GameService} from "../../../service/game.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CommonService} from "../../../service/common.service";
import {ResponseBody} from "@src/app/types/common.type";

@Component({
    selector: 'app-mobile-game-son-common',
    templateUrl: './mobile-game-son-common.component.html',
    styleUrls: ['./mobile-game-son-common.component.less']
})
export class MobileGameSonCommonComponent implements OnInit {

    constructor(public game: GameService,
                public message: NzMessageService,
                public common: CommonService,
                public location: Location,
                public cdr: ChangeDetectorRef,
                public route: ActivatedRoute) {
    }

    public logoImgUrl: string = '';

    // 查询的搜索游戏参数
    public searchName: string = '';

    // tab切换的title数据 三级列表数据
    public thirdList: any = [];

    // 游戏展示列表数据
    public forthList: any = [];

    // loading 加载效果
    public isLoading: boolean = false;

    // 处理彩票的css
    public lotteryArr: any = ['IG', 'IGPJ', 'VR', 'GY'];

    // 二级id， 查询调用
    public secondId: number;

    // 三级id 清空查询调用
    public thirdId: number;
    ngOnInit() {
        this.dealParams();
    }

    dealParams(): void {
        this.route.queryParams.subscribe((res: any) => {
            const {id} = res;
            if (!id) {
                return this.location.back();
            }
            this.secondId = id;
            this.getSecondList(id);
        });
    }

    /**
     * @description: 获取四级列表
     * @author: merlin
     */
    getSecondList(id: number): void {
        this.isLoading = true;
        this.forthList = [];
        this.game.getMenuList(id).subscribe((res: ResponseBody) => {
            const {data, status} = res;
            if (status === 10000) {
                const secondObj = data[0];
                const {subMenus, menuNameCn, icons} = secondObj;
                this.thirdList = subMenus;
                this.common.commonRouteTitle = menuNameCn;
                this.logoImgUrl = icons[0].img;
                // 获取四级数据
                this.getforthList(subMenus[0].id);

            }
        });
    }

    /**
     * @author merlin
     * @date 2020/2/4
     * @Description:
     * @params:  id 当前id
     */
    getforthList(id: number): void {
        this.isLoading = true;
        this.thirdId = id;
        this.game.getMenuList(id).subscribe((res: ResponseBody) => {
            const {data, status} = res;
            if (status === 10000) {
                this.forthList = data[0].subMenus;
            }
        }, null, () => this.isLoading = false);
        this.cdr.detach(); // 停止检测，主要是对于，开发环境的报错处理，生产环境没有问题
        setTimeout(() => {
            // 延迟处理loading

            this.cdr.reattach();
        }, 300);
    }

    // 搜索查询
    getSearchForthList(): void {
        const { searchName, secondId } = this;
        if (!this.searchName) {
            this.getforthList(this.thirdId);
            return;
        }
        this.game.getSearchForthList({ menuName: searchName, id: secondId }).subscribe((res: ResponseBody) => {
            const {data, status} = res;
            if (status === 10000) {
                this.forthList = data;
            }
        });
    }

    // 进入游戏
    loadGame(item) {
        const {gameCode, gameId} = item;
        const params = {
            gameCode,
            gameId,
        };
        this.game.loadMobileGame(params);
    }
}
