import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {MobileHeaderComponent} from './mobile-header/mobile-header.component';
import {MobileFooterComponent} from './mobile-footer/mobile-footer.component';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {MobileSettingWithdrawPasswordComponent} from './mobile-setting-withdraw-password/mobile-setting-withdraw-password.component';
import {MobileSettingWithdrawBankcardComponent} from './mobile-setting-withdraw-bankcard/mobile-setting-withdraw-bankcard.component';
import {MobileTimerComponent} from './mobile-timer/mobile-timer.component';
import {MobileMescrollComponent} from './mobile-mescroll/mobile-mescroll.component';
import { MobileRecordSelectComponent } from './mobile-record-select/mobile-record-select.component';
import { StatusPipe } from "@src/app/util/statusPipe";
import { LimitInputDirective } from "@src/app/util/input.directive";
import { MobileSlidingComponent } from './mobile-sliding/mobile-sliding.component';

const routes: Routes = [];


@NgModule({
    declarations: [MobileHeaderComponent, MobileFooterComponent,
        MobileSettingWithdrawPasswordComponent, MobileSettingWithdrawBankcardComponent,
        MobileTimerComponent, MobileMescrollComponent, MobileRecordSelectComponent,
        StatusPipe, LimitInputDirective, MobileSlidingComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        MobileFooterComponent,
        MobileHeaderComponent,
        MobileSettingWithdrawPasswordComponent,
        MobileSettingWithdrawBankcardComponent,
        MobileTimerComponent,
        MobileMescrollComponent,
        MobileRecordSelectComponent,
        StatusPipe,
        LimitInputDirective,
        MobileSlidingComponent,
        RouterModule
    ]
})
export class MobileCommonModule {
}
