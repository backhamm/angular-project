import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MobileDepositComponent} from "@src/app/mobile/mobile-capital/mobile-deposit/mobile-deposit.component";
import {AuthCenterGuard} from "@src/app/auth/auth.center.guard";
import {MobileWidthdrawComponent} from "@src/app/mobile/mobile-capital/mobile-widthdraw/mobile-widthdraw.component";
import {MobileAllAssetsComponent} from "@src/app/mobile/mobile-capital/mobile-all-assets/mobile-all-assets.component";
import {MobileTransferAccountsComponent} from "@src/app/mobile/mobile-capital/mobile-transfer-accounts/mobile-transfer-accounts.component";
import {MobileCapitalProxyComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/mobile-capital-proxy.component";
import {MobileCapitalProxyInviteComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/component/mobile-capital-proxy-invite/mobile-capital-proxy-invite.component";
import {MobileCapitalProxyRecordComponent} from "@src/app/mobile/mobile-capital/mobile-capital-proxy/component/mobile-capital-proxy-record/mobile-capital-proxy-record.component";
import {MobileDepositObankOrderComponent} from "@src/app/mobile/mobile-capital/mobile-deposit/mobile-deposit-obank-order/mobile-deposit-obank-order.component";
import {TransferSuccessComponent} from "@src/app/mobile/mobile-capital/mobile-transfer-accounts/components/transfer-success/transfer-success.component";
import {MobileDepositOrderComponent} from "@src/app/mobile/mobile-capital/mobile-deposit/mobile-deposit-order/mobile-deposit-order.component";


const routes: Routes = [
  {path: '', redirectTo: 'deposit', pathMatch: 'full'},
  {path: 'deposit', component: MobileDepositComponent, canActivate: [AuthCenterGuard]},
    {path: 'order', component: MobileDepositOrderComponent, data: {title: '存款'}},
  {path: 'withdraw', component: MobileWidthdrawComponent, data: {title: '提款'}},
  {path: 'allAssets', component: MobileAllAssetsComponent, data: {title: '资产明细'}},
  {path: 'transferAccounts', component: MobileTransferAccountsComponent, data: {title: '平台转账'}},
  {path: 'transferAccounts/success', component: TransferSuccessComponent, data: {title: '转账成功'}},
  {path: 'proxy', component: MobileCapitalProxyComponent, data: {title: '无限代理'}},
  {path: 'proxy/invite', component: MobileCapitalProxyInviteComponent, data: {title: '邀请方式'}},
  {path: 'proxy/record', component: MobileCapitalProxyRecordComponent, data: {title: '数据统计'}},
  {path: 'obankOrder', component: MobileDepositObankOrderComponent, data: {title: '银行汇款'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileCapitalRoutingModule {
}
