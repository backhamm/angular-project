import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegralRoutingModule } from './integral-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IntegralMallComponent } from './components/integral-mall/integral-mall.component';
import { IntegralDetailComponent } from './components/integral-detail/integral-detail.component';
import { IntegralRecordComponent } from './components/integral-record/integral-record.component';
import { IntegralRuleComponent } from './components/integral-rule/integral-rule.component';
import {UntilModule} from "@src/app/util/until.module";

@NgModule({
    declarations: [IntegralMallComponent, IntegralDetailComponent, IntegralRecordComponent, IntegralRuleComponent],
    imports: [
        CommonModule,
        IntegralRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        UntilModule
    ]
})
export class IntegralModule {
}
