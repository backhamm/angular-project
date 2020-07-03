import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobilePersonalComponent} from './mobile-personal/mobile-personal.component';
import { MobileSetInforComponent } from './mobile-set-infor/mobile-set-infor.component';
import { MobileSetPhoneComponent } from './mobile-set-phone/mobile-set-phone.component';
import { MobileSetSafetyComponent } from './mobile-set-safety/mobile-set-safety.component';
import { MobileModifyPasswordComponent } from './mobile-modify-password/mobile-modify-password.component';
import { MobileSetWithdrawPasswordComponent } from './mobile-set-withdraw-password/mobile-set-withdraw-password.component';
import { MobileSetBankCardComponent } from './mobile-set-bank-card/mobile-set-bank-card.component';
import { MobileCapitalFundsComponent } from './mobile-capital-funds/mobile-capital-funds.component';
import { MobileCapitalBettingComponent } from './mobile-capital-betting/mobile-capital-betting.component';
import {MobileStationLetterComponent} from "@src/app/mobile/mobile-user/mobile-station-letter/mobile-station-letter.component";

const routes: Routes = [
  {path: 'userPersonal', component: MobilePersonalComponent, data: {title: '个人中心'}},
  {path: 'personalName/:id', component: MobileSetInforComponent, data: {title: ''}},
  {path: 'userPhone', component: MobileSetPhoneComponent, data: {title: '绑定手机'}},
  {path: 'setSafety', component: MobileSetSafetyComponent, data: {title: '安全设置'}},
  {path: 'modify-password', component: MobileModifyPasswordComponent, data: {title: '登录密码'}},
  {path: 'userWithdrawal', component: MobileSetWithdrawPasswordComponent, data: {title: '提款密码'}},
  {path: 'userBankCard', component: MobileSetBankCardComponent, data: {title: '银行卡'}},
  {path: 'capital-funds', component: MobileCapitalFundsComponent, data: {title: '资金记录'}},
  {path: 'capital-betting', component: MobileCapitalBettingComponent, data: {title: '投注记录'}},
  {path: 'stationLetter', component: MobileStationLetterComponent, data: {title: '站内信'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileUserRoutingModule { }
