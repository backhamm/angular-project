import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MobileIndexComponent} from "@src/app/mobile/mobile-home/mobile-index.component";
import {MobileLoginComponent} from "@src/app/mobile/mobile-login/mobile-login.component";
import {MobileIntegralComponent} from "@src/app/mobile/mobile-integral/mobile-integral.component";
import {MobileCenterComponent} from "@src/app/mobile/mobile-center/mobile-center.component";
import {MobileIntegralSubpageComponent} from "@src/app/mobile/mobile-integral/components/mobile-integral-subpage/mobile-integral-subpage.component";
import {MobileRegisterComponent} from "@src/app/mobile/mobile-register/mobile-register.component";
import {MobileComponent} from "@src/app/mobile/mobile-layout/mobile.component";
import {MobileCustomerServiceComponent} from "@src/app/mobile/mobile-customer-service/mobile-customer-service.component";
import {MobileFreeComponent} from "@src/app/mobile/mobile-free/mobile-free.component";

const routes: Routes = [
	{path: '', redirectTo: 'm', pathMatch: 'full'},
	{
		path: 'm',
		component: MobileComponent,
		children: [
			{path: '', redirectTo: 'home', pathMatch: 'full'},
			{path: 'home', component: MobileIndexComponent, data: {title: '首页'}},
			{path: 'login', component: MobileLoginComponent, data: {title: '登录'}},
			{path: 'register', component: MobileRegisterComponent, data: {title: '注册'}},
			{path: 'customerService', component: MobileCustomerServiceComponent, data: {title: '客服'}},
			{path: 'free', component: MobileFreeComponent, data: {title: '免费试玩'}},
			{path: 'memberCenter', component: MobileCenterComponent},
			{path: 'integral', component: MobileIntegralComponent, data: {title: '积分商城'}},
			{path: 'integral/subpage/:id', component: MobileIntegralSubpageComponent},
			{path: 'help', loadChildren: () => import('./mobile/mobile-help/mobile-help.module').then(m => m.MobileHelpModule)},
			{path: 'game', loadChildren: () => import('./mobile/mobile-game/mobile-game.module').then(m => m.MobileGameModule)},
			{path: 'activity', loadChildren: () => import('./mobile/mobile-activity/mobile-activity.module').then(m => m.MobileActivityModule)},
			{path: 'capital', loadChildren: () => import('./mobile/mobile-capital/mobile-capital.module').then(m => m.MobileCapitalModule)},
			{path: 'user', loadChildren: () => import('./mobile/mobile-user/mobile-user.module').then(m => m.MobileUserModule)},
		]
	}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes,
            {
                useHash: false,
                preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
