import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MobileAdventuresComponent} from "./mobile-adventures/mobile-adventures.component";
import {MobileDiscountComponent} from "./mobile-discount/mobile-discount.component";
import {MobileCouponHomeComponent} from "./mobile-coupon-home/mobile-coupon-home.component";


const routes: Routes = [
    {path: 'adventures', component: MobileAdventuresComponent},
    {path: 'coupons', component: MobileCouponHomeComponent},
    {path: 'discount', component: MobileDiscountComponent, data: {title: '最新优惠'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MobileActivityRoutingModule {
}
