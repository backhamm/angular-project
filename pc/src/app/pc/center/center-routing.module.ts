import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CapitalInterchangeComponent} from './components/capital-interchange/interchange-auto/capital-interchange.component';
import {CapitalDepositIndexComponent} from './components/capital-deposit/capital-deposit-index.component';
import {CapitalDrawingComponent} from './components/capital-withdraw/capital-withdraw.component';
import {AuthCenterGuard} from '../../auth/auth.center.guard';
import {CenterPersonalComponent} from './components/center-personal/center-personal.component';
import {CenterInfoComponent} from './components/center-personal/center-info/center-info.component';
import {CenterModifyPasswordComponent} from './components/center-personal/center-modify-password/center-modify-password.component';
import {CapitalFundsComponent} from './components/capital-history/capital-funds/capital-funds.component';
import {CapitalBettingComponent} from './components/capital-history/capital-betting/capital-betting.component';
import {CapitalProxyComponent} from './components/capital-proxy/capital-proxy.component';
import {CenterIndexComponent} from './components/center-index/center-index.component';
import {CenterUserphoneComponent} from './components/center-personal/center-userphone/center-userphone.component';
import {CenterDrawalPasswordComponent} from "./components/center-personal/center-drawal-password/center-drawal-password.component";
import {CenterBankcardComponent} from './components/center-personal/center-bankcard/center-bankcard.component';
import {CenterNewsComponent} from './components/center-news/center-news.component';
import {CapitalInterchangeHandComponent} from "./components/capital-interchange/interchange-hand/capital-interchange-hand.component";
import {CapitalProxyInforComponent} from "@src/app/pc/center/components/capital-proxy/components/capital-proxy-infor/capital-proxy-infor.component";

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthCenterGuard],
        component: CenterIndexComponent,
        children: [
            {path: '', redirectTo: 'interchange-auto', pathMatch: 'full'},
            {path: 'interchange-hand', component: CapitalInterchangeHandComponent},
            {path: 'interchange-auto', component: CapitalInterchangeComponent},
            {path: 'deposit', component: CapitalDepositIndexComponent},
            {path: 'withdraw', component: CapitalDrawingComponent},
            {path: 'personal', component: CenterPersonalComponent},
            {path: 'personalName/:id', component: CenterInfoComponent},
            {path: 'modify_password', component: CenterModifyPasswordComponent},
            {path: 'funds', component: CapitalFundsComponent},
            {path: 'betting', component: CapitalBettingComponent},
            {path: 'proxy', component: CapitalProxyComponent},
            {path: 'userPhone', component: CenterUserphoneComponent},
            {path: 'drawalPassword', component: CenterDrawalPasswordComponent},
            {path: 'bankcard', component: CenterBankcardComponent},
            {path: 'news', component: CenterNewsComponent},
            {path: 'proxy-infor', component: CapitalProxyInforComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CapitalRoutingModule {

}
