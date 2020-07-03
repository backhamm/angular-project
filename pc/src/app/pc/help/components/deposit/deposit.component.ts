import { Component, OnInit } from '@angular/core';
import {PlatformService} from "@service/platform.service";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.less']
})
export class DepositComponent implements OnInit {

  constructor(
    public platform: PlatformService,
  ) { 
  }

  ngOnInit() {
  }

}
