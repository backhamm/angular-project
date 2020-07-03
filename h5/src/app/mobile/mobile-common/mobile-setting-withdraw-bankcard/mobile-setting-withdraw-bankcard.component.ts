import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "@service/user.service";
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {PlatformService} from "@service/platform.service";
import {_Reg} from "@src/app/util/validate";
import {Location} from "@angular/common";

@Component({
    selector: 'app-mobile-setting-withdraw-bankcard',
    templateUrl: './mobile-setting-withdraw-bankcard.component.html',
    styleUrls: ['./mobile-setting-withdraw-bankcard.component.less']
})
export class MobileSettingWithdrawBankcardComponent implements OnInit {
    // 是否返回上一级菜单页面
    @Input() isGoBack: boolean = true;
    @Output() getCardInfo: EventEmitter<any> = new EventEmitter();
    public visible: boolean = false;
    public currentSelectItem: string = '请选择银行列表';
    public currentIndex: any = -1;
    //  是否加载中
    public isLoading: boolean = false;
    //设定状态
    public current: number = 1;
    //银行卡种类
    bankList: Array<any> = [];
    //用户输入信息
    public bankInfo: any = {
        cardUsername: '',
        bankId: null,
        cardNum: '',
        cardAddress: '',
        password: ''
    };
    //银行卡
    public bank: any = {};

    constructor(public user: UserService,
                public message: NzMessageService,
                public router: Router,
                public location: Location,
                public platformService: PlatformService) {
    }
    ngOnInit() {
        // 验证提款
       this.getBankCardPwd();

    }

    // 切换抽屉显示隐藏
    openToggleDraw(): void {
        this.visible = !this.visible;
    }


    changeSelectedBank(item: any, index: number) {
        const {bankId, bankName} = item;
        this.currentIndex = index;
        this.currentSelectItem = bankName;
        this.bankInfo.bankId = bankId;
        // 处理抽屉
        this.openToggleDraw();
    }

    //用户信息
    getUserinfo() {
        this.isLoading = true;
        this.user.getUserInfo().subscribe(res => {
            res.status === 10000 ? this.user.userInfo = res.data : null;
            this.isLoading = false;
        });
    }

    //检查用户是否设置取款密码
    getBankCardPwd() {

        const { hasWithdrawPassword, hasBankCard } = this.user.user;
        // 设定银行卡直接展示
        if (hasBankCard) {
            return this.getUserCard();
        }
        // 如果未设定提款密码先设定提款密码
        if (!this.user.user.hasWithdrawPassword) {
            this.message.info('你还没有设置提款密码，3秒之后将会跳转到设置提款密码页面');
            setTimeout(() => {
                this.router.navigate(['/m/user/userWithdrawal']);
            }, 3000);
        } else {
            // 获取银行卡类型列表
            this.getBankTypes();
        }
    }

    //检查用户是否绑定银行卡
    getUserCard() {
        this.user.getUserCard().subscribe(res => {
            if (res.status === 10000) {
                this.bank = res.data;
            }
        });
    }
    // 获取银行卡类型
    getBankTypes() {
        this.user.getBankTypes().subscribe(res => {
            const { data, status, msg } = res;
            if (status === 10000) {
                this.bankList = data;
            } else {
                this.message.error(msg);
                setTimeout(() => this.location.back(), 1000);
            }
        });
    }

    next() {
       this.regParams().then(() => {
           this.user.addUserCard(this.bankInfo).subscribe(res => {
               if (res.status === 10000) {
                   this.message.success('添加银行卡成功');
                   this.user.userInfo.hasBankCard = true;
                   this.isGoBack ? this.router.navigate(['/m/user/setSafety']) : this.getCardInfo.emit();
               } else {
                   this.message.error(res.msg);
               }
           });
       }, err => this.message.error(err));


    }
    // 输入框限制验证；
    regParams(): Promise<any> {
        return new Promise((res, rej) => {
            const {cardUsername, bankId, cardNum, cardAddress, password} = this.bankInfo;
            const {realName, withdrawPassword, card} = _Reg;
            if (!realName.reg.test(cardUsername)) {
                return rej(realName.message);
            }
            if (!card.reg.test(cardNum)) {
                return rej(card.message);
            }
            if (!bankId) {
                return rej('请选择银行');
            }
            if (cardAddress === '') {
                return rej('请输入正确的开户支行地址！');
            }
            if (!withdrawPassword.reg.test(password)) {
                return rej(withdrawPassword.message);
                return false;
            }
            res();
        });
    }

}
