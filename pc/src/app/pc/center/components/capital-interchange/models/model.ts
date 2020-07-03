// 资金列表返回
export class Capital {
    totalBalance: any;               // 总资产
    wallet: any;                  // 钱包
    integral: any;                 // 积分
    outstandingCommissions?: any;   // 未结佣金
}

//  列表数据明细
export class AssetsGameListDetail {
    balance: any;
    platCode: string;
    platImg: string;
    platName: string;
    status: number;   // 游戏状态 0:关闭 1:开启
}
