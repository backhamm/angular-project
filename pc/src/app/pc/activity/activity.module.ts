import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityRoutingModule} from './activity-routing.module';
import {RedDetailComponent} from './components/red/red-detail/red-detail.component';
import { TurntableComponent } from './components/turntable/turntable.component';
import {UntilModule} from "@src/app/util/until.module";
import {RedPacketComponent} from "@src/app/pc/activity/components/red/red-packet/red-packet.component";
import {ScratchComponent} from "@src/app/pc/activity/components/scratch/scratch.component";
import {FormsModule} from "@angular/forms";
import {NgZorroAntdModule} from "ng-zorro-antd";

@NgModule({
    declarations: [
      RedDetailComponent,
      TurntableComponent,
      RedPacketComponent,
      ScratchComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ActivityRoutingModule,
        UntilModule
    ],
    exports: [
      TurntableComponent,
      RedPacketComponent,
      ScratchComponent
    ]
})
export class ActivityModule {
}
