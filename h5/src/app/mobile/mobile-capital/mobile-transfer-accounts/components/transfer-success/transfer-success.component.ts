import { Component, OnInit } from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-transfer-success',
  templateUrl: './transfer-success.component.html',
  styleUrls: ['./transfer-success.component.less']
})
export class TransferSuccessComponent implements OnInit {

  constructor(
    public config: ConfigService,
    public location: Location,
  ) { }

  ngOnInit() {
  }

}
