import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChessComponent} from './components/chess/chess.component';
import {LiveComponent} from './components/live/live.component';
import {ElectronicsComponent} from './components/electronics/electronics.component';
import {SportsComponent} from './components/sports/sports.component';
import {GamingComponent} from './components/gaming/gaming.component';
import {LotteryComponent} from './components/lottery/lottery.component';
import {FishingComponent} from './components/fishing/fishing.component';
import {GameRoutingModule} from './game-routing.module';
import {NgZorroAntdModule, NzButtonModule} from 'ng-zorro-antd';
import {NzPaginationModule} from 'ng-zorro-antd';
import {NzInputModule} from 'ng-zorro-antd';
import {NzIconModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzEmptyModule} from 'ng-zorro-antd';
import { ChessTxComponent } from './components/chess-tx/chess-tx.component';
import {CommonpageModule} from "@src/app/pc/commonpage/commonpage.module";

@NgModule({
    declarations: [
        ChessComponent,
        LiveComponent,
        ElectronicsComponent,
        SportsComponent,
        GamingComponent,
        LotteryComponent,
        FishingComponent,
        ChessTxComponent
    ],
    imports: [
        CommonModule,
        GameRoutingModule,
        NzButtonModule,
        NzPaginationModule,
        NzInputModule,
        NzIconModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        CommonpageModule,
        NzEmptyModule
    ],
    entryComponents: [ChessComponent]
})
export class GameModule {
}
