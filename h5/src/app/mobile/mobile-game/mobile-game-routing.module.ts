import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MobileGameSonCommonComponent} from "@src/app/mobile/mobile-game/mobile-game-son-common/mobile-game-son-common.component";
import {MobileGameCommonComponent} from "@src/app/mobile/mobile-game/mobile-game-common/mobile-game-common.component";

const routes: Routes = [
  {path: '', component: MobileGameCommonComponent, data: {title: '分类'}},
  {path: 'allgames', component: MobileGameSonCommonComponent, data: {title: ''}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileGameRoutingModule {
}
