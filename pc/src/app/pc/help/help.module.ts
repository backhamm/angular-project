import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpIndexComponent } from './components/help-index/help-index.component';
import { HelpNavComponent } from './components/help-nav/help-nav.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { DrawingComponent } from './components/drawing/drawing.component';
import { CommonProblemComponent } from './components/common-problem/common-problem.component';
import { AgencyComponent } from './components/agency/agency.component';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';





@NgModule({
    declarations: [
        HelpIndexComponent, 
        HelpNavComponent,  
        AboutUsComponent, 
        ContactUsComponent, 
        DepositComponent, 
        DrawingComponent,
        CommonProblemComponent,
        AgencyComponent
    ],
    imports: [
        CommonModule,
        HelpRoutingModule,
        NzMenuModule,
        NzCollapseModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class HelpModule { }
