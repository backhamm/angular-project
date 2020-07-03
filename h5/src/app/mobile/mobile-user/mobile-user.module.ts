import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileCommonModule } from "../mobile-common/mobile-common.module";
import { MobileUserRoutingModule } from './mobile-user-routing.module';
import { NgZorroAntdModule} from "ng-zorro-antd";
import { MobilePersonalComponent } from './mobile-personal/mobile-personal.component';
import { MobileSetInforComponent } from './mobile-set-infor/mobile-set-infor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MobileSetPhoneComponent } from './mobile-set-phone/mobile-set-phone.component';
import { MobileSetSafetyComponent } from './mobile-set-safety/mobile-set-safety.component';
import { MobileModifyPasswordComponent } from './mobile-modify-password/mobile-modify-password.component';
import { MobileSetWithdrawPasswordComponent } from './mobile-set-withdraw-password/mobile-set-withdraw-password.component';
import { MobileSetBankCardComponent } from './mobile-set-bank-card/mobile-set-bank-card.component';
import { MobileCapitalFundsComponent } from './mobile-capital-funds/mobile-capital-funds.component';
import { MobileCapitalBettingComponent } from './mobile-capital-betting/mobile-capital-betting.component';
import { MobileStationLetterComponent } from './mobile-station-letter/mobile-station-letter.component';

@NgModule({
  declarations: [MobilePersonalComponent, MobileSetInforComponent, MobileSetPhoneComponent, MobileSetSafetyComponent, MobileModifyPasswordComponent, MobileSetWithdrawPasswordComponent, MobileSetBankCardComponent, MobileCapitalFundsComponent, MobileCapitalBettingComponent, MobileStationLetterComponent],
  imports: [
    CommonModule,
    MobileUserRoutingModule,
    NgZorroAntdModule,
    MobileCommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MobileUserModule { }
