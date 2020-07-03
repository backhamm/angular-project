import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MobileCommonModule} from "../mobile-common/mobile-common.module";
import {MobileHelpRoutingModule} from './mobile-help-routing.module';
import {NzIconModule} from "ng-zorro-antd";
import {NzTabsModule} from 'ng-zorro-antd/tabs';

import {MobileHelpIndexComponent} from './component/mobile-help-index/mobile-help-index.component';
import {MobileHelpItemComponent} from './component/mobile-help-item/mobile-help-item.component';
import {MobileHelpDetailsComponent} from './component/mobile-help-details/mobile-help-details.component';
import {MobileHelpClassComponent} from './component/mobile-help-class/mobile-help-class.component';
import {MobileHelpHomeComponent} from './mobile-help-home/mobile-help-home.component';
import { MobileHelpAboutComponent } from './component/mobile-help-about/mobile-help-about.component';

@NgModule({
    declarations: [
        MobileHelpIndexComponent,
        MobileHelpItemComponent,
        MobileHelpDetailsComponent,
        MobileHelpClassComponent,
        MobileHelpHomeComponent,
        MobileHelpAboutComponent
    ],
    imports: [
        CommonModule,
        MobileHelpRoutingModule,
        MobileCommonModule,
        NzIconModule,
        NzTabsModule
    ]
})
export class MobileHelpModule {
}
