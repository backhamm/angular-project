import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DiscountComponent} from './components/discount/discount.component';
import {HomeComponent} from './components/home/home.component';
import {DiscountDetailComponent} from './components/discount-detail/discount-detail.component';
import {NewsComponent} from "@src/app/pc/platform/components/news/news.component";
import {AboutUsComponent} from "@src/app/pc/platform/components/about-us/about-us.component";
import { FreeComponent } from "@src/app/pc/platform/components/free/free.component";
import {DownloadComponent} from "@src/app/pc/platform/components/download/download.component";


const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: HomeComponent},
    {path: 'discount', component: DiscountComponent},
    {path: 'discount-detail/:id', component: DiscountDetailComponent},
    {path: 'news', component: NewsComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'free', component: FreeComponent},
    {path: 'download', component: DownloadComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlatformRoutingModule {
}
