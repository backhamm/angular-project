import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {MobileActivityRoutingModule} from "./mobile-activity-routing.module";
import {MobileCommonModule} from "../mobile-common/mobile-common.module";
import {NzIconModule} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";

import {MobileAdventuresComponent} from './mobile-adventures/mobile-adventures.component';
import {MobileDiscountComponent} from './mobile-discount/mobile-discount.component';
import {MobileCouponHomeComponent} from './mobile-coupon-home/mobile-coupon-home.component';
import {NoticeComponent} from './component/notice/notice.component';
import {CountDownComponent} from './component/count-down/count-down.component';

@NgModule({
    declarations: [
        MobileAdventuresComponent,
        MobileDiscountComponent,
        MobileCouponHomeComponent,
        NoticeComponent,
        CountDownComponent
    ],
    imports: [
        CommonModule,
        MobileCommonModule,
        NgZorroAntdModule,
        MobileActivityRoutingModule,
        NzIconModule,
        FormsModule
    ]
})
export class MobileActivityModule {
}
