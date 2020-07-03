import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameHotComponent } from "@src/app/pc/commonpage/game-hot/game-hot.component";
import { GameLoginAlertComponent } from "@src/app/pc/commonpage/game-login-alert/game-login-alert.component";
import { FormsModule } from "@angular/forms";
import { NoticeAlertComponent } from './notice-alert/notice-alert.component';
import { RouterModule } from '@angular/router';
import { ActiveLoginAlertComponent } from './active-login-alert/active-login-alert.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {UntilModule} from "@src/app/util/until.module";

@NgModule({
    declarations: [
        GameHotComponent, 
        GameLoginAlertComponent,
         NoticeAlertComponent, 
         ActiveLoginAlertComponent
        ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NzInputModule,
        NzIconModule,
        UntilModule
    ],
    exports: [
        GameHotComponent, 
        GameLoginAlertComponent, 
        NoticeAlertComponent,
        ActiveLoginAlertComponent
    ]
})
export class CommonpageModule {
}
