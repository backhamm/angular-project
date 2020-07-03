import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@src/app/config/config.service';

@Component({
  selector: 'app-integral-rule',
  templateUrl: './integral-rule.component.html',
  styleUrls: ['./integral-rule.component.less']
})
export class IntegralRuleComponent implements OnInit {

  constructor(
    public comfig: ConfigService
  ) { }

  ngOnInit() {
  }

}
