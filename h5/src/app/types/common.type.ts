// 请求返回体限定
export interface ResponseBody {
    data: any;
    msg: string;
    status: number;
}

interface ListExtend {
    noread?: number;
    isread?: number;
    allread?: number;
    totalBetAmount?: string;
    totalValidBetAmount?: string;
    totalPayout?: string;
    totalNetAmount?: string;
    currBetAmount?: string;
    currValidBetAmount?: string;
    currPayout?: string;
    currNetAmount?: string;
}

export interface ResponseList {
    list: Array<any>;
    pageNo: number;
    pageSize: number;
    total: number;
    totalPage: number;
    extendBean?: ListExtend;
}

// 快速注册
export interface AccountReg {
    username: string;
    mobileNo: string;
    password: string;
    repassword: string;
    qkPassword?: string;
    realname?: string;
    recommendCode?: string;     // 推荐码
    weixin?: string;
    qq?: string;
    rmk?: string;
    email?: string;
}

// 手机注册
export interface MobileReg {
    mobileNo: string;
    msgCode?: string;       // 手机验证码
    recommendCode?: string;  // 推荐码
}

// 平台网站配置
export interface WebComConfig {
    configs: any;
    type: string;
	typeName: string;
}

// 平台在线客服
export interface WebComContact {
    href: string;
    imageResourceUrl: string;
    imageUrl: string;
    isjump: number;
    prefix: string;
    type: number;
    value: string;
    weight: number;
}

// 游戏列表资产展示
export interface GameList {
    gameCode: string;
    gameName: string;
    img: string;
    balance: any;
}

// 验证函数(多个)参数类型
export interface MulValidate {
    regName: string;
    val: any;
}

// 银行卡类型
export interface BankTypes {
    bankId: number;
    bankName: string;
}

// 银行卡类型
export interface BankInfo {
    cardUsername: any;
    bankId: any;
    cardNum: any;
    cardAddress: any;
    password: any;
}

export interface UserBankCard {
    addTime: string;  // 绑定事件
    bankName: string; // 名称
    cardAddress: string;  // 地址
    cardNum: string; // 卡号
    cardUsername: string; // 户主名
    id: number;
}

export interface BetPlatList {
    type: number;
    desc: string;
    bets: Array<{ gameName: string; gameCode: string; gameImg: string; selected?: boolean }>;
}

export interface SelectPlat {
    type: number;
    gameName: string;
    gameCode: string;
}

export interface NavGameInfo {
    gameCode: string;
    gameId: number;
    hot: number;
    id: number;
    imgs: any;
    menuNameCn: string;
    menuNameEn: string;
    menuType: string;
    parentId: number;
    parentName: string;
    remark: string;
    sortNo: number;
    subMenus: any;
    template: string;
    url: string;
    link?: string;
    viewType: string;
    hasSub: boolean;
    totalSub: number;
}

export interface WithdrawParams {
    amount: number;
    commissionBeginDate: string;
    commissionEndDate: string;
}

export interface CommissionParams {
    pageSize: number;
    pageNo: number;
    startTime: string;
    endTime: string;
}

export interface InviteList {
    pageSize: number;
    pageNo: number;
}

// 资金记录
export interface FundRecord {
    pageNo: number;
    pageSize: number;
    bdate: any;
    edate: any;
    type?: number;
    status?: number;
}

// 投注记录
export interface BetRecord {
    type: string;
    pageSize: number;
    pageNo: number;
    bdate: string;
    edate: string;
}

// 提款
export interface WithDraw {
    amount: string;
    password: string;
}

// 刮刮乐
export interface ScratchParams {
    aid: string;
    mobile: string;
    msgCode: string;
    terminal?: string;
}

// 验证码

export interface MsgCode {
    mobileNo: string;
}

// 显示存款
export interface ScanPay {
    scancode: string;
    amount: number;
    payId: number;
    terminal?: string;
}

// 网银线上
export interface OnlineBanking extends ScanPay {
    bankcode: string;
}

export interface GeTab {
    id: string;
    pageNo: number;
    pageSize: number;
}

// 进入游戏参数
export interface LoadParams {
    gameCode: string;
    gameId: number;
    terminal?: string;
}

export interface GoodsParams {
    pageNo: number;
    pageSize: number;
    terminal?: string;
}

export interface ExchangeParams {
    id: number;
    num: number;
    deliverPhone: number;
    deliverAddress: string;
    deliverRmk: string;
    deliverName: string;
    terminal?: string;
}

export interface IntegralRecodParams {
    terminal?: string;
    pageSize: number;
    pageNo: number;
    bdate: string;
    edate: string;
}


// 用户信息
export interface UserInfo {
    username: string;
    vipLevel: string;
    wallet: number;
    email: string;
    hasBankCard: boolean;
    hasMobile: boolean;
    hasWithdrawPassword: boolean;
    integral: number;
    loginDate: string;
    regDate: string;
    mobile: string;
    realname: string;
    rmk: string;
    totalBalance: number;
    uid: number;
    unread: number;
    qq: string;
    weixin: string;
    agencyLevel: string;              // 代理会员层级
    withdraw: boolean;                // 是否可以提取佣金
    agencyStatus: number;             // 代理状态    0-加入 1-停用 2-未加入
    outstandingCommissions: string;   // 未结佣金
    commissionBeginDate: string;      // 计佣开始时间
    commissionEndDate: string;        // 计佣结束时间
}

export interface LoginPass {
    password: string;
    npassword: string;
    renpassword: string;
    terminal?: string;
}

