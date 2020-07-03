import {Injectable} from "@angular/core";
import {Request} from "@src/app/http/request";
import {Observable, of} from "rxjs";
import {map, tap} from 'rxjs/operators';
import {ConfigService} from '@src/app/config/config.service';
import {CommissionParams, GameList, InviteList, ResponseBody, ResponseList, WithDraw, WithdrawParams} from '@src/app/types/common.type';
import {UserService} from '@service/user.service';
import {StorageService} from "@service/storage.service";


@Injectable({
    providedIn: 'root'
})
export class CapitalService {

    constructor(
        public request: Request,
        public config: ConfigService,
        public storage: StorageService,
        public user: UserService
    ) {
    }

    // 所有游戏列表
    public allGameListInfo: GameList[];
    // 已点击游戏列表
    public playedGameList: GameList[];

    /**
     * 获取所有游戏列表信息( 不包含资金 )
     *  @return {Observable<ResponseBody>}
     */
    getAllGameListInfo() {
        return this.request.get('game/transfer/code/config').pipe(
            tap(res => {
                if (res.status === 10000) {
                    res.data.unshift({
                        balance: this.user.user.wallet,
                        gameName: '中心娱乐城',
                        gameImg: `${this.config.baseMobileImgUrl}image/user_img/zx_pic.png`,
                        gameCode: '0'
                    });
                    // this.allGameListInfo = res.data;
                    this.updateCapitalList(res.data).subscribe();
                }
            })
        );
    }

    /**
     * 获取已玩游戏资产列表( 主要获取资金 )
     * @param gameList => 有值:请求所有列表并赋值； 无值:仅刷新金额
     */
    updateCapitalList(gameList?: GameList[]): Observable<ResponseBody> {
        return this.request.post('game/balance/batch').pipe(
            tap(res => {
                if (res.status === 10000) {
                    let allGameArr = gameList ? gameList : this.allGameListInfo;
                    res.data.forEach(playedGameItem => {
                        allGameArr.forEach(allGameItem => {
                            if (playedGameItem.gameCode === allGameItem.gameCode) {
                                playedGameItem.img = allGameItem.img;
                                allGameItem.balance = playedGameItem.balance;
                            }
                        });
                    });
                    this.allGameListInfo = allGameArr;
                    this.playedGameList = res.data;
                }
            })
        );
    }


    /**
     *  资产一键回收
     */
    oneRecycling(): Observable<ResponseBody> {
        return this.request.post('game/balance/recycle/batch').pipe(
            tap(res => {
                if (res.status === 10000) {
                    // 更新游戏列表金额
                    this.allGameListInfo.forEach(item => {
                        if (item.gameCode === '0') {
                            item.balance = res.data.wallet;
                        } else {
                            item.balance = 0;
                        }
                    });
                    this.playedGameList.forEach(item => {
                        item.balance = 0;
                    });
                }
            })
        );
    }

    /** 资金回收 根据 平台code
     * @param {string} platCode
     */
    recyclingByCode(platCode: string): Observable<ResponseBody> {
        return this.request.post('game/balance/recycle/signle', {gameCode: platCode}).pipe(
            tap(res => {
                if (res.status === 10000) {
                    // 更新游戏列表金额
                    this.allGameListInfo.forEach(item => {
                        if (item.gameCode === platCode) {
                            item.balance = 0;
                        }
                    });
                    this.playedGameList.forEach(item => {
                        if (item.gameCode === platCode) {
                            item.balance = 0;
                        }
                    });
                }
            })
        );
    }

    /**
     * 手动转账
     * @param {boolean} type    自平台转出 true 转出 false
     * @param {number} amount   转出金额
     * @param {string} platCode 平台
     */
    doTransfer(type: boolean, amount: number, platCode: string): Observable<ResponseBody> {
        let requestUrl = type ? 'game/transferIn' : 'game/transferOut';
        return this.request.post(requestUrl, {
            amount: amount,
            gameCode: platCode
        }).pipe(tap(res => {
            if (res.status === 10000) {
                const {gameCode, wallet, gameBalance} = res.data;
                this.user.userInfo.wallet = wallet;
                // 更新游戏列表金额
                this.allGameListInfo.forEach(item => {
                    if (item.gameCode === gameCode) {
                        item.balance = gameBalance;
                    }
                    // 更新钱余额
                    item.gameCode === '0' ? item.balance = wallet : null;

                });
                this.playedGameList.forEach(item => {
                    if (item.gameCode === gameCode) {
                        item.balance = gameBalance;
                    }
	                // 更新钱余额
	                item.gameCode === '0' ? item.balance = wallet : null;
                });
            }
        }));
    }

    // 获取资金流水配置接口
    getHistoryConfig() {
        return this.request.get('user/treasure/config');
    }

    // 投注记录平台编码数据
    getBetConfig() {
        return this.request.get('game/bet/code/config');
    }

    /**
     * @description: 获取资金记录
     * @author: table
     * @param params
     * @return: Observable<ResponseBody>
     */
    getFundRecord(params: any): Observable<ResponseList> {
        return this.request.get('user/treasure/record', params);

    }

    /**
     * @description: 获取会员投注记录
     * @author: table
     * @param params
     * @return: Observable<ResponseBody>
     */
    getBetRecord(params: any): Observable<ResponseList> {
        return this.request.get('game/bet/record', params);
    }

    /**
     * @description: 获取平台推荐
     * @author: table
     */
    getPlatform(): Observable<any> {
        let platform = this.storage.getItem('platformList');
        if (platform) {
            return of(JSON.parse(platform));
        } else {
            return this.request.get('game/getGameListForQueryBet').pipe(
                map(res => {
                    if (res.status === 10000) {
                        //遍历添加选中判断
                        let idata = res.data;
                        idata.forEach((item: any) => {

                            let lists = item.list;
                            lists.forEach((list: any) => {
                                Object.assign(list, {select: false});
                            });
                        });
                        return idata;
                    } else {
                        return res.msg;
                    }
                })
            );
        }
    }

    // 提款配置信息
    withddrawConfig(): Observable<ResponseBody> {
        return this.request.get('withdraw/config');
    }

    /**
     * @description 取款
     * @param params
     */
    doWithDraw(params: WithDraw): Observable<ResponseBody> {
        return this.request.post('withdraw/create/order', params);
    }

    /**
     * @description: 获取无限代理文案图片配置
     * @author: table
     * @return: Observable<ResponseBody>
     */
    getProxyConfig(): Observable<ResponseBody> {
        return this.request.get('agency/config/copy/pictures', {
            // src: this.config.identity
        });
    }

    /**
     * @description: 获取无限代理提佣记录轮播
     * @author: table
     * @return: Observable<ResponseBody>
     */
    getProxyCarousel(): Observable<any> {
        return this.request.get('agency/commission/carousel').pipe(
            map(res => {
                if (res.status === 10000) {
                    return res.data;
                }
            })
        );
    }

    /**
     * @description: 获取无限代理 看盘相关数据
     * @author: table
     */
    getAgentData(): Observable<ResponseBody> {
        return this.request.get('agency/user/init/data');
    }

    /**
     * @description: 加入代理
     * @author: table
     */
    joinAgent(): Observable<ResponseBody> {
        return this.request.post('agency/user/join');
    }

    /**
     * @description: 获取无限代理 当前用户代理信息
     * @author: table
     */
    getSelfAgent(): Observable<ResponseBody> {
        return this.request.get('agency/user/curr/agency/data');
    }

    /**
     * @description: 获取无限代理 邀请方式
     * @author: table
     */
    getInviteType(): Observable<ResponseBody> {
        return this.request.get('agency/user/invite/method');
    }

    /**
     * @description: 获取无限代理 邀请记录
     * @author: table
     */
    getInviteList(params: InviteList): Observable<ResponseBody> {
        return this.request.get('agency/user/invite/records', params);
    }

    /**
     * @description: 获取无限代理 每日佣金
     * @author: table
     */
    getCommissionPage(params: CommissionParams): Observable<ResponseBody> {
        return this.request.get('agency/commission/daily', params);
    }

    /**
     * @description: 获取无限代理 提佣记录
     * @author: table
     */
    getCommissionRecord(params: CommissionParams): Observable<ResponseBody> {
        return this.request.get('agency/withdraw/commission/record', params);
    }

    /**
     * @description: 获取无限代理 提取佣金
     * @author: table
     */
    getWithdrawlComm(params: WithdrawParams): Observable<ResponseBody> {
        return this.request.post('agency/withdraw/commission/order', params);
    }

}






