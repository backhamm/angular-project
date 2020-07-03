import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Scratch} from './scratch';
import {ActivityService} from "@service/activity.service";
import {ConfigService} from "@src/app/config/config.service";
import {AuthenticationService} from "@src/app/service/authentication.service";

@Component({
    selector: 'app-mobile-scavenger',
    templateUrl: './mobile-scavenger.component.html',
    styleUrls: ['./mobile-scavenger.component.less']
})
export class MobileScavengerComponent implements OnInit, AfterViewInit {
    public btnText = '立即领奖';
    public scratchesMonery: string = '';
    public isScratch: boolean = true;
    public mobile: string;
    public msgCode: string;
    public isShow: boolean = false;

    constructor(
        public service: ActivityService,
        public el: ElementRef,
        public config: ConfigService,
        public scratch: Scratch,
        public auth: AuthenticationService
    ) {}

    scratchesBtn(phone: string) {
        if (this.scratch.scratchData.verifyPhone) {
            this.scratch.senMoney(phone);
        } else {
            if (!this.isScratch) {
                this.scratch.msgCode = this.msgCode;
                this.scratch.sure(this.mobile);
            }
            this.scratch.step = 2;
            this.btnText = '确定';
            this.isScratch = false;
        }
    }

    close() {
        this.service.hasScavenger = false;
    }

    clearPhone(): void {
        this.mobile = '';
        this.msgCode = '';
    }

    initScavenger() {
        let nativeElement = this.el.nativeElement;
        let parentEl = nativeElement.querySelector('.scratches-main');
        if (!parentEl) { return; }
        let parentElTop: number = parentEl.offsetTop;
        let parentElLeft: number = parentEl.offsetLeft;
        let canvas = nativeElement.querySelector('#canvas');
        this.scratch.canvasInt(canvas, parentElTop, parentElLeft);
    }

    init(): void {
      if (this.auth.isAuth && this.service.hasScavenger) {
            this.service.getReward().subscribe(res => {
                if (res.status === 10000) {
                    const { usermoney, phoneNo} = res.data;
                    this.scratchesMonery = usermoney;
                    this.mobile = phoneNo;
                    this.scratch.scratchData = res.data;
                    this.isShow = true;
                } else {
                    this.isShow = false;
                }
            });
        }
    }

    ngOnInit() {
        this.init();
    }

    ngAfterViewInit() {
        this.initScavenger();
    }
}
