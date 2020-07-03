import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {PcLayoutComponent} from "@src/app/pc/layout/layout.component";
import {RegisterComponent} from '@src/app/pc/layout/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: PcLayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: () => import('@src/app/pc/platform/platform.module').then(m => m.PlatformModule)},
      {path: 'game', loadChildren: () => import('@src/app/pc/game/game.module').then(m => m.GameModule)},
      {path: 'integral', loadChildren: () => import('@src/app/pc/integral/integral.module').then(m => m.IntegralModule)},
      {path: 'center', loadChildren: () => import('@src/app/pc/center/center.module').then(m => m.CenterModule)},
      {path: 'activity', loadChildren: () => import('@src/app/pc/activity/activity.module').then(m => m.ActivityModule)},
      {path: 'help', loadChildren: () => import('@src/app/pc/help/help.module').then(m => m.HelpModule)},
      {path: 'register', component: RegisterComponent},
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: false,
        preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'top'
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
