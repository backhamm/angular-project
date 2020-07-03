import {AfterContentChecked, AfterViewChecked, Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import MeScroll from 'mescroll.js/mescroll.min.js';
import {CapitalService} from "@service/capital.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
    selector: 'app-mobile-capital-proxy-record',
    templateUrl: './mobile-capital-proxy-record.component.html',
    styleUrls: ['./mobile-capital-proxy-record.component.less']
})
export class MobileCapitalProxyRecordComponent implements OnInit {
    // 当前选中tab,邀请记录
    public currentIndex: number = 0;
    // 顶部tab
    public tabArr = [
        {name: '邀请记录', id: 0},
        {name: '每日佣金', id: 1},
        {name: '提佣记录', id: 2},
    ];

    // 绑定数据table
    public tableData: any = {};

    // 请求接口参数
    public reqParams: any = {
        pageSize: 15,
        pageNo: 1
    };
    // 页面loading
    public isLoading: boolean = false;
    constructor(public capitalService: CapitalService, public messgae: NzMessageService, public zone: NgZone,
                public changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        // 创建下拉刷新对象
        this.createRefresh();
        // 调用初始化接口邀请记录的数据
        this.getData(false, false, false);

    }

    // 初始化创建三个下拉刷新的对象, 根据0,1,2来加载区分不同的mescroll的id
    createRefresh(): void {
        const refreshArr = [0, 1, 2];
        refreshArr.forEach(item => {
            this.refresh(item);
        });
    }

    // 列表数据，接口统一处理
    recordData(method, downFresh: boolean = false, upFresh: boolean = false, destroyMescroll: boolean = false): void {
        this.isLoading = true;
        this.capitalService[method](this.reqParams).subscribe(res => {
            if (res.status === 10000) {
                // 如果是下拉刷新的情况就调用刷新结束方法'endSuccess'
                if (downFresh) {
                    this[`mescroll${this.currentIndex}`].endSuccess();
                }
                const idata = res.data;
                this.tableData = idata;
                if (upFresh) {
                    this[`mescroll${this.currentIndex}`].endByPage(this.reqParams.pageSize, idata.total / 15);
                }
                if (!idata.list.length) {
                    this[`mescroll${this.currentIndex}`].optUp.use = false;
                }
                // this.changeDetectorRef.markForCheck();
                this.changeDetectorRef.detectChanges();

            } else {
                this.messgae.error(res.msg);
            }
        }, null, () => this.isLoading = false);
    }
    /**
     * @author Merlin
     * @date 2019/8/14
     * @Description: 切换tab  调用数据
     * @params: isRefresh
     * @return:
     */
    getData(downFresh: boolean = false, upFresh: boolean = false, destroyMescroll: boolean = false): void {
        if (destroyMescroll) {
            this.createRefresh();
        }
        switch (this.currentIndex) {
            case 0:
                this.recordData('getInviteList', false, true, false);
                break;
            case 1:
                this.recordData('getCommissionPage', false, true, false);
                break;
            case 2:
                this.recordData('getCommissionRecord', false, true, false);
            default:
                return;
        }
    }

    changeData(item: any): void {
        const {name, id} = item;
        this.currentIndex = id;
        // 切换tab参数就初始化以及更新当前tab的数据
        this.reqParams.pageSize = 15;
        this.getData( false, true,  true);
    }

    refresh(current): void {
        if (this['mescroll' + current]) {
            // 切换时间重置实例，参数数据初始化，列表清空
            this.tableData = [];
            this['mescroll' + current].destroy();
            this.reqParams.pageSize = 15;
        }
        const that = this;
        //创建MeScroll对象
        this['mescroll' + current] = new MeScroll('mescroll' + current + '', {
            up: {
                callback: (page, mescroll) => {
                    const {total, pageSize} = that.tableData;
                    that.reqParams.pageSize = page.size * page.num;
                    that.getData(false, true, false);
                },
                page: {
                    num: 1, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size: 15, //每页数据条数,默认10
                },
                htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>',
                offset: 5,
                auto: false,
                use: true
            },
            down: {
                callback: (mescroll) => {
                    that.getData(true, false, false);
                },
                auto: false,
            },
        });
    }
}
