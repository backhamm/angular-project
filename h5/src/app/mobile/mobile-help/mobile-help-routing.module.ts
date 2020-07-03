import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MobileHelpHomeComponent} from "@src/app/mobile/mobile-help/mobile-help-home/mobile-help-home.component";
import {MobileHelpIndexComponent} from "@src/app/mobile/mobile-help/component/mobile-help-index/mobile-help-index.component";
import {MobileHelpClassComponent} from "@src/app/mobile/mobile-help/component/mobile-help-class/mobile-help-class.component";
import {MobileHelpDetailsComponent} from "@src/app/mobile/mobile-help/component/mobile-help-details/mobile-help-details.component";
import {MobileHelpAboutComponent} from "@src/app/mobile/mobile-help/component/mobile-help-about/mobile-help-about.component";

const routes: Routes = [
    {
        path: '',
        component: MobileHelpHomeComponent,
        children: [
            {path: '', component: MobileHelpIndexComponent, data: {title: '帮助中心'}},
            {path: 'helpClass/:id/:title', component: MobileHelpClassComponent},
            {path: 'helpDetails/:id/:title', component: MobileHelpDetailsComponent, data: {title: '问题详情'}},
            {path: 'about', component: MobileHelpAboutComponent, data: {title: '关于我们'}},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MobileHelpRoutingModule {
}
