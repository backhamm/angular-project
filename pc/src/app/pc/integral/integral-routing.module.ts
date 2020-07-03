import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IntegralMallComponent} from './components/integral-mall/integral-mall.component';
import {IntegralRecordComponent} from "@src/app/pc/integral/components/integral-record/integral-record.component";
import {IntegralRuleComponent} from "@src/app/pc/integral/components/integral-rule/integral-rule.component";


const routes: Routes = [
    {path: '', redirectTo: 'integralMall', pathMatch: 'full'},
    {path: 'integralMall', component: IntegralMallComponent},
    {path: 'integralRecord', component: IntegralRecordComponent},
    {path: 'integralRule', component: IntegralRuleComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntegralRoutingModule {
}
