import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MobileDepositComponent} from "@src/app/mobile/mobile-capital/mobile-deposit/mobile-deposit.component";
import {AuthCenterGuard} from "@src/app/auth/auth.center.guard";
import {MobileWidthdrawComponent} from "@src/app/mobile/mobile-capital/mobile-widthdraw/mobile-widthdraw.component";
import {MobileAllAssetsComponent} from "@src/app/mobile/mobile-capital/mobile-all-assets/mobile-all-assets.component";
import {MobileTransferAccountsComponent} from "@src/app/mobile/mobile-capital/mobile-transfer-accounts/mobile-transfer-accounts.component";
import {MobileCapitalProxyComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/mobile-capital-proxy.component";
import {MobileDepositObankOrderComponent} from "@src/app/mobile/mobile-capital/mobile-deposit/mobile-deposit-obank-order/mobile-deposit-obank-order.component";
import {TransferSuccessComponent} from "@src/app/mobile/mobile-capital/mobile-transfer-accounts/components/transfer-success/transfer-success.component";
import {MobileDepositOrderComponent} from "@src/app/mobile/mobile-capital/mobile-deposit/mobile-deposit-order/mobile-deposit-order.component";
import {TeamMembersComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/component/mobile-proxy-join/components/team-members/team-members.component";
import {ProxyCommissionsComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/component/mobile-proxy-join/components/proxy-commissions/proxy-commissions.component";
import {InviteRecordComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/component/mobile-proxy-join/components/invite-record/invite-record.component";
import {ExtractRecordComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/component/mobile-proxy-join/components/extract-record/extract-record.component";
import {BrokerageRecordComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/component/mobile-proxy-join/components/brokerage-record/brokerage-record.component";
import {TeamManagementComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/component/mobile-proxy-join/components/team-management/team-management.component";


const routes: Routes = [
  {path: '', redirectTo: 'deposit', pathMatch: 'full'},
  {path: 'deposit', component: MobileDepositComponent, canActivate: [AuthCenterGuard]},
  {path: 'order', component: MobileDepositOrderComponent, data: {title: '存款'}},
  {path: 'withdraw', component: MobileWidthdrawComponent, data: {title: '提款'}},
  {path: 'allAssets', component: MobileAllAssetsComponent, data: {title: '资产明细'}},
  {path: 'transferAccounts', component: MobileTransferAccountsComponent, data: {title: '平台转账'}},
  {path: 'transferAccounts/success', component: TransferSuccessComponent, data: {title: '转账成功'}},
  {path: 'proxy', component: MobileCapitalProxyComponent, data: {title: '无限代理'}},
  {path: 'proxy/teamMembers', component: TeamMembersComponent},
  {path: 'proxy/inviteRecord', component: InviteRecordComponent, data: {title: '邀请记录'}},
  {path: 'proxy/teamManagement', component: TeamManagementComponent, data: {title: '团队管理'}},
  {path: 'proxy/brokerageRecord', component: BrokerageRecordComponent, data: {title: '佣金流水'}},
  {path: 'proxy/extractRecord', component: ExtractRecordComponent, data: {title: '提佣记录'}},
  {path: 'proxy/commissions', component: ProxyCommissionsComponent},
  {path: 'obankOrder', component: MobileDepositObankOrderComponent, data: {title: '银行汇款'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileCapitalRoutingModule {
}
