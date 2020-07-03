import {NgModule} from '@angular/core';
import {CapitalInterchangeComponent} from './components/capital-interchange/interchange-auto/capital-interchange.component';
import {CapitalDepositIndexComponent} from './components/capital-deposit/capital-deposit-index.component';
import {CapitalDrawingComponent} from './components/capital-withdraw/capital-withdraw.component';
import {CapitalRoutingModule} from './center-routing.module';
import {CenterNavComponent} from './components/center-nav/center-nav.component';
import {CenterPersonalComponent} from './components/center-personal/center-personal.component';
import {NgZorroAntdModule, NzToolTipModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {CenterInfoComponent} from './components/center-personal/center-info/center-info.component';
import {FormsModule} from '@angular/forms';
import {CenterModifyPasswordComponent} from './components/center-personal/center-modify-password/center-modify-password.component';
import {CapitalFundsComponent} from './components/capital-history/capital-funds/capital-funds.component';
import {CapitalBettingComponent} from './components/capital-history/capital-betting/capital-betting.component';
import {CapitalProxyComponent} from './components/capital-proxy/capital-proxy.component';
import {CenterIndexComponent} from './components/center-index/center-index.component';
import {CenterUserphoneComponent} from './components/center-personal/center-userphone/center-userphone.component';
import {CenterDrawalPasswordComponent} from './components/center-personal/center-drawal-password/center-drawal-password.component';
import {CenterBankcardComponent} from './components/center-personal/center-bankcard/center-bankcard.component';
import {CapitalInterchangeHandComponent} from "./components/capital-interchange/interchange-hand/capital-interchange-hand.component";
import {NzModalModule} from 'ng-zorro-antd';
import {CapitalProxyNoComponent} from './components/capital-proxy/components/capital-proxy-no/capital-proxy-no.component';
import {CapitalProxyYesComponent} from './components/capital-proxy/components/capital-proxy-yes/capital-proxy-yes.component';
import {CenterNewsComponent} from './components/center-news/center-news.component';
import {QRCodeModule} from 'angular2-qrcode';
import {ClipboardModule} from 'ngx-clipboard';
import {CapitalOnlinePayComponent} from "@src/app/pc/center/components/capital-deposit/capital-online-pay/capital-online-pay.component";
import {ScanPayResultComponent} from "@src/app/pc/center/components/capital-deposit/scan-pay-result/scan-pay-result.component";
import {SafePipeModule} from "safe-pipe";
import {CapitalDepositBankComponent} from "@src/app/pc/center/components/capital-deposit/capital-bank-offline/capital-bank-offline.component";
import {DepositReminderComponent} from "@src/app/pc/center/components/capital-deposit/deposit-reminder/deposit-reminder.component";
import {DepositBankOneStepComponent} from '@src/app/pc/center/components/capital-deposit/capital-bank-offline/deposit-bank-one-step/deposit-bank-one-step.component';
import {DepositBankTwoStepComponent} from '@src/app/pc/center/components/capital-deposit/capital-bank-offline/deposit-bank-two-step/deposit-bank-two-step.component';
import {CapitalScanOfflineComponent} from './components/capital-deposit/capital-scan-offline/capital-scan-offline.component';
import { CapitalProxyDisabledComponent } from './components/capital-proxy/components/capital-proxy-disabled/capital-proxy-disabled.component';
import { CapitalProxyInforComponent } from './components/capital-proxy/components/capital-proxy-infor/capital-proxy-infor.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {UntilModule} from "@src/app/util/until.module";

@NgModule({
    declarations: [
        CapitalInterchangeComponent,
        CapitalDepositIndexComponent,
        CapitalDrawingComponent,
        CenterNavComponent,
        CenterPersonalComponent,
        CenterInfoComponent,
        CenterModifyPasswordComponent,
        CapitalFundsComponent,
        CapitalBettingComponent,
        CapitalProxyComponent,
        CenterIndexComponent,
        CenterUserphoneComponent,
        CenterDrawalPasswordComponent,
        CenterBankcardComponent,
        CapitalInterchangeHandComponent,
        CapitalProxyNoComponent,
        CapitalProxyYesComponent,
        CapitalInterchangeHandComponent,
        CenterNewsComponent,
        CapitalOnlinePayComponent,
        ScanPayResultComponent,
        CapitalDepositBankComponent,
        DepositReminderComponent,
        DepositBankOneStepComponent,
        DepositBankTwoStepComponent,
        CapitalScanOfflineComponent,
        CapitalProxyDisabledComponent,
        CapitalProxyInforComponent
    ],
    imports: [
        CommonModule,
        CapitalRoutingModule,
        NgZorroAntdModule,
        NzToolTipModule,
        FormsModule,
        NzModalModule,
        QRCodeModule,
        ClipboardModule,
        SafePipeModule,
        NgxEchartsModule,
        UntilModule
    ]
})
export class CenterModule {
}
