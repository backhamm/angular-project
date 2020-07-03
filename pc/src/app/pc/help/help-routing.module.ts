import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpIndexComponent } from './components//help-index/help-index.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { DrawingComponent } from './components/drawing/drawing.component';
import { CommonProblemComponent } from './components/common-problem/common-problem.component';
import { AgencyComponent } from './components/agency/agency.component';


const routes: Routes = [
    {
        path: 'problem',
        component: HelpIndexComponent,
        children: [
            {path: 'aboutUs', component: AboutUsComponent},
            {path: 'contactUs', component: ContactUsComponent},
            {path: 'agency', component: AgencyComponent},
            {path: 'deposit', component: DepositComponent},
            {path: 'drawing', component: DrawingComponent},
            {path: 'commonProblem', component: CommonProblemComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
