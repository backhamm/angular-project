import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {DiscountComponent} from './components/discount/discount.component';
import {PlatformRoutingModule} from './platform-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DiscountDetailComponent} from './components/discount-detail/discount-detail.component';
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewsComponent} from "@src/app/pc/platform/components/news/news.component";
import {UntilModule} from "@src/app/util/until.module";
import {ActivityModule} from "@src/app/pc/activity/activity.module";
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FreeComponent } from './components/free/free.component';
import { DownloadComponent } from './components/download/download.component';
import {CommonpageModule} from "@src/app/pc/commonpage/commonpage.module";

@NgModule({
    declarations: [
        HomeComponent,
        DiscountComponent,
        DiscountDetailComponent,
        NewsComponent,
        AboutUsComponent,
        FreeComponent,
        DownloadComponent,
        
    ],
    imports: [
        CommonModule,
        PlatformRoutingModule,
        NgZorroAntdModule,
        LoadingBarRouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonpageModule,
        UntilModule,
        ActivityModule
    ]
})
export class PlatformModule {
}
