import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HeaderComponent} from '@src/app/pc/layout/components/header/header.component';
import {FooterComponent} from '@src/app/pc/layout/components/footer/footer.component';
import {PageLandingComponent} from './pc/layout/components/page-landing/page-landing.component';
import {LoginComponent} from '@src/app/pc/layout/components/login/login.component';
import {RegisterComponent} from '@src/app/pc/layout/components/register/register.component';
import {PcLayoutComponent} from "@src/app/pc/layout/layout.component";
import {UntilModule} from "@src/app/util/until.module";
import {NpxSliderVerifyModule} from "npx-slider-verify";
import {CommonpageModule} from "@src/app/pc/commonpage/commonpage.module";
import { PageRollingComponent } from './pc/layout/components/page-rolling/page-rolling.component';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        PcLayoutComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        PageLandingComponent,
        PageRollingComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        NgZorroAntdModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LoadingBarRouterModule,
        LoadingBarHttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UntilModule,
        NpxSliderVerifyModule,
        CommonpageModule
    ],
    providers: [
        {provide: NZ_I18N, useValue: zh_CN},
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
