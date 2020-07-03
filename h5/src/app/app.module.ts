import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {httpInterceptorProviders} from '@src/app/http/InterceptorProvides';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {MobileIndexComponent} from "@src/app/mobile/mobile-home/mobile-index.component";
import {MobileLoginComponent} from "@src/app/mobile/mobile-login/mobile-login.component";
import {MobileIntegralComponent} from "@src/app/mobile/mobile-integral/mobile-integral.component";
import {MobileCenterComponent} from "@src/app/mobile/mobile-center/mobile-center.component";
import {MobileScavengerComponent} from "@src/app/mobile/mobile-activity/mobile-scavenger/mobile-scavenger.component";
import {MobileIntegralSubpageComponent} from "@src/app/mobile/mobile-integral/components/mobile-integral-subpage/mobile-integral-subpage.component";
import {MobileRegisterComponent} from "@src/app/mobile/mobile-register/mobile-register.component";
import {MobileCouponComponent} from "@src/app/mobile/mobile-activity/mobile-coupon/mobile-coupon.component";
import {MobileComponent} from "@src/app/mobile/mobile-layout/mobile.component";
import {MobileCustomerServiceComponent} from "@src/app/mobile/mobile-customer-service/mobile-customer-service.component";
import {MobileCommonModule} from "@src/app/mobile/mobile-common/mobile-common.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NpxSliderVerifyModule} from "npx-slider-verify";
import { MobileFreeComponent } from './mobile/mobile-free/mobile-free.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
	  MobileComponent,
	  MobileIndexComponent,
	  MobileLoginComponent,
	  MobileRegisterComponent,
	  MobileCenterComponent,
	  MobileCouponComponent,
	  MobileScavengerComponent,
	  MobileCustomerServiceComponent,
	  MobileIntegralComponent,
	  MobileIntegralSubpageComponent,
	  MobileFreeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
	  MobileCommonModule,
	  FormsModule,
	  ReactiveFormsModule,
	  NpxSliderVerifyModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
