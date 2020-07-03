import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QRCodeModule} from 'angular2-qrcode';
import {MobileWidthdrawComponent} from './mobile-widthdraw/mobile-widthdraw.component';
import {MobileDepositComponent} from './mobile-deposit/mobile-deposit.component';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {MobileCapitalRoutingModule} from "./mobile-capital-routing.module";
import {MobileCommonModule} from "../mobile-common/mobile-common.module";
import {MobileDepositTextTooltipComponent} from './component/mobile-deposit-text-tooltip/mobile-deposit-text-tooltip.component';
import {MobileDepositBankComponent} from './mobile-deposit/mobile-deposit-bank/mobile-deposit-bank.component';
import {MobileDepositObankComponent} from './mobile-deposit/mobile-deposit-obank/mobile-deposit-obank.component';
import {MobileDepositScanComponent} from './mobile-deposit/mobile-deposit-scan/mobile-deposit-scan.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MobileDepositOrderComponent} from './mobile-deposit/mobile-deposit-order/mobile-deposit-order.component';
import {MobileDepositObankOrderComponent} from './mobile-deposit/mobile-deposit-obank-order/mobile-deposit-obank-order.component';
import {MobileAllAssetsComponent} from './mobile-all-assets/mobile-all-assets.component';
import {MobileTransferAccountsComponent} from './mobile-transfer-accounts/mobile-transfer-accounts.component';
import {MobileCapitalProxyComponent} from './mobile-capital-proxy/mobile-capital-proxy.component';
import {ClipboardModule} from "ngx-clipboard";
import { MobileDepositOnlineComponent } from './mobile-deposit/mobile-deposit-online/mobile-deposit-online.component';
import { MobileProxyNotjoinComponent } from './mobile-capital-proxy/component/mobile-proxy-notjoin/mobile-proxy-notjoin.component';
import { MobileProxyJoinComponent } from './mobile-capital-proxy/component/mobile-proxy-join/mobile-proxy-join.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { TransferSuccessComponent } from './mobile-transfer-accounts/components/transfer-success/transfer-success.component';
import { TeamMembersComponent } from './mobile-capital-proxy/component/mobile-proxy-join/components/team-members/team-members.component';
import { ProxyCommissionsComponent } from './mobile-capital-proxy/component/mobile-proxy-join/components/proxy-commissions/proxy-commissions.component';
import { InviteRecordComponent } from './mobile-capital-proxy/component/mobile-proxy-join/components/invite-record/invite-record.component';
import { DropDownComponent } from './mobile-capital-proxy/component/mobile-proxy-join/components/common/drop-down/drop-down.component';
import { ExtractRecordComponent } from './mobile-capital-proxy/component/mobile-proxy-join/components/extract-record/extract-record.component';
import { RecordSidebarComponent } from './mobile-capital-proxy/component/mobile-proxy-join/components/common/record-sidebar/record-sidebar.component';
import { BrokerageRecordComponent } from './mobile-capital-proxy/component/mobile-proxy-join/components/brokerage-record/brokerage-record.component';
import { TeamManagementComponent } from './mobile-capital-proxy/component/mobile-proxy-join/components/team-management/team-management.component';

@NgModule({
    declarations: [MobileWidthdrawComponent, MobileDepositComponent,
        MobileDepositTextTooltipComponent, MobileDepositBankComponent, MobileDepositObankComponent, MobileDepositScanComponent,
        MobileDepositOrderComponent,
        MobileDepositObankOrderComponent,
        MobileAllAssetsComponent,
        MobileTransferAccountsComponent,
        MobileCapitalProxyComponent,
        MobileDepositOnlineComponent,
        MobileProxyNotjoinComponent,
        MobileProxyJoinComponent,
        TransferSuccessComponent,
        TeamMembersComponent,
        ProxyCommissionsComponent,
        InviteRecordComponent,
        DropDownComponent,
        ExtractRecordComponent,
        RecordSidebarComponent,
        BrokerageRecordComponent,
        TeamManagementComponent,
    ],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        MobileCapitalRoutingModule,
        MobileCommonModule,
        FormsModule,
        ReactiveFormsModule,
        QRCodeModule,
        ClipboardModule,
        NgxEchartsModule
    ]
})
export class MobileCapitalModule {
}
