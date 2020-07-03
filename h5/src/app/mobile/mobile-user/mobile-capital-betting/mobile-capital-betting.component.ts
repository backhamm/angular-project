import {Component, OnInit, ViewChild} from '@angular/core';
import {CapitalService} from '@service/capital.service';
import {NzMessageService} from 'ng-zorro-antd';
import {format} from "date-fns/esm";
import {ResponseList} from "@src/app/types/common.type";
import {ConfigService} from "@src/app/config/config.service";
import {MobileMescrollComponent} from "@src/app/mobile/mobile-common/mobile-mescroll/mobile-mescroll.component";
import {config as configs} from "@src/app/config/config.service";
const {BASE_IMG_MOBILE_URL} = configs.platform;

@Component({
	selector: 'app-mobile-capital-betting',
	templateUrl: './mobile-capital-betting.component.html',
	styleUrls: ['./mobile-capital-betting.component.less']
})
export class MobileCapitalBettingComponent implements OnInit {
	// 下拉刷新对象
	@ViewChild('mescroll', null) mescroll: MobileMescrollComponent;

	params: any = {
		pageNo: 1,
		pageSize: 10,
		bdate: '',
		edate: '',
		gameCode: 'ALL',
		type: -1,

	};
	public isSelect: boolean = true;

	records: Array<any> = [];

	totalObj: any = {};

	//  是否加载中
	public isLoading: boolean = false;

	constructor(public service: CapitalService,
	            public message: NzMessageService,
	            public config: ConfigService) {
		this.getData = this.getData.bind(this);
		this.close = this.close.bind(this);
	}

	ngOnInit() {

	}


	getData(isRefresh?: boolean): void {
		if (isRefresh) {
			return this.mescroll.original();
		}

		const {bdate, edate, type} = this.params;
		if (type < 0) {
			return;
		}
		this.isLoading = true;
		// 格式化时间
		const params = {...this.params, bdate: format(bdate, 'yyyy-MM-dd'), edate: format(edate, 'yyyy-MM-dd')};
		this.service.getBetRecord(params).subscribe((res: ResponseList) => {
			 // res = {
				//  "list": [
				// 	 {
				// 		 "betAmount": 20,
				// 		 "bettime": "2017-10-06 22.00.30",
				// 		 "gameType": "开源棋牌",
				// 		 "id": 0,
				// 		 "netAmount": 120,
				// 		 "payout": 1230,
				// 		 "validBetAmount": 450
				// 	 },
				// 	 {
				// 		 "betAmount": 20,
				// 		 "bettime": "2017-10-06 22.00.30",
				// 		 "gameType": "开源棋牌",
				// 		 "id": 0,
				// 		 "netAmount": -120,
				// 		 "payout": 1230,
				// 		 "validBetAmount": 450
				// 	 },
				// 	 {
				// 		 "betAmount": 20,
				// 		 "bettime": "2017-10-06 22.00.30",
				// 		 "gameType": "开源棋牌",
				// 		 "id": 0,
				// 		 "netAmount": 120,
				// 		 "payout": 1230,
				// 		 "validBetAmount": 450
				// 	 },
				// 	 {
				// 		 "betAmount": 20,
				// 		 "bettime": "2017-10-06 22.00.30",
				// 		 "gameType": "开源棋牌",
				// 		 "id": 0,
				// 		 "netAmount": 120,
				// 		 "payout": 1230,
				// 		 "validBetAmount": 450
				// 	 },
				// 	 {
				// 		 "betAmount": 20,
				// 		 "bettime": "2017-10-06 22.00.30",
				// 		 "gameType": "开源棋牌",
				// 		 "id": 0,
				// 		 "netAmount": 120,
				// 		 "payout": 1230,
				// 		 "validBetAmount": 450
				// 	 },
				//  ],
				//  "pageNo": 1,
				//  "pageSize": 10,
				//  "total": 300,
				//  "totalPage": 0,
				//  "extendBean": {"totalBetAmount": "0.00", "totalValidBetAmount": "0.00", "totalPayout": "0.00", "totalNetAmount": "0.00", "currBetAmount": "0.00", "currValidBetAmount": "0.00", "currPayout": "0.00", "currNetAmount": "0.00"}
			 // };

			// 展开数据添加属性
			this.records = res.list.map(item => ({...item, showDetail: false}));
			this.totalObj = res.extendBean;
			// 创建下拉刷新
			this.mescroll.createRefresh();
			// 有上拉下拉再处理返回
			this.mescroll.dealResponse(res);
		}, null, () => this.isLoading = false);
	}

	close() {
		this.isSelect = !this.isSelect;
	}
  // 过滤图片
  getSrc(item: any): string {
    const { status } = item;
    return `${BASE_IMG_MOBILE_URL}image/user_img/navCheck_0${status}.png`;
  }
	showDetail(item: any) {
		item.showDetail = !item.showDetail;
	}
}
