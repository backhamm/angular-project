import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule, NzInputModule} from 'ng-zorro-antd';
// import { NzGridModule } from 'ng-zorro-antd/grid';
import {MobileGameRoutingModule} from "./mobile-game-routing.module";
import {MobileCommonModule} from "../mobile-common/mobile-common.module";
import {MobileGameCommonComponent} from './mobile-game-common/mobile-game-common.component';
import {MobileGameSonCommonComponent} from './mobile-game-son-common/mobile-game-son-common.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        MobileGameCommonComponent,
        MobileGameSonCommonComponent
    ],
    imports: [
        CommonModule,

        MobileGameRoutingModule,
        MobileCommonModule,
        // NzGridModule,
        NgZorroAntdModule,
        NzInputModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MobileGameModule {
}
