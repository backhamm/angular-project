import { Component, OnInit } from '@angular/core';
import {PlatformService} from "@service/platform.service";
import { DepositService } from '@src/app/service/deposit.service';

@Component({
  selector: 'app-deposit-reminder',
  templateUrl: './deposit-reminder.component.html',
  styleUrls: ['./deposit-reminder.component.less']
})
export class DepositReminderComponent implements OnInit {
  // 当前支付商列表
  get payList() {
    return this.deposit.paymentPayer.config;
  }
  constructor(
      public platform: PlatformService,
      public deposit: DepositService
  ) { }

  ngOnInit() {
  }

}
