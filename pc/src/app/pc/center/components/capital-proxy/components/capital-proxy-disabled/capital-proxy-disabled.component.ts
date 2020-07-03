import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '@src/app/config/config.service';

@Component({
  selector: 'app-capital-proxy-disabled',
  templateUrl: './capital-proxy-disabled.component.html',
  styleUrls: ['./capital-proxy-disabled.component.less']
})
export class CapitalProxyDisabledComponent implements OnInit {

  constructor(
    public config: ConfigService
  ) { }

  ngOnInit() {

  }

}

