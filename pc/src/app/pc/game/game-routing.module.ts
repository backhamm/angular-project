import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ChessComponent} from './components/chess/chess.component';
import {LiveComponent} from './components/live/live.component';
import {ElectronicsComponent} from './components/electronics/electronics.component';
import {SportsComponent} from './components/sports/sports.component';
import {LotteryComponent} from './components/lottery/lottery.component';
import {GamingComponent} from './components/gaming/gaming.component';
import {FishingComponent} from './components/fishing/fishing.component';
import { ChessTxComponent } from './components/chess-tx/chess-tx.component';


const routes: Routes = [
    {path: '', redirectTo: 'txqp', pathMatch: 'full'},
    {path: 'chess', component: ChessComponent},
    {path: 'live', component: LiveComponent},
    {path: 'electronic', component: ElectronicsComponent},
    {path: 'sports', component: SportsComponent},
    {path: 'esports', component: GamingComponent},
    {path: 'lottery', component: LotteryComponent},
    {path: 'fish', component: FishingComponent},
    {path: 'dtqp', component: ChessTxComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {
}
