import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RedDetailComponent } from './components/red/red-detail/red-detail.component';
import { TurntableComponent } from './components/turntable/turntable.component';

const routes: Routes = [
    { path: 'red', component: RedDetailComponent },
    { path: 'turntable', component: TurntableComponent },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ActivityRoutingModule {
}
