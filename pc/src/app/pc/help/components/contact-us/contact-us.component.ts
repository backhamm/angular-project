import { Component, OnInit } from '@angular/core';
import {ConfigService} from "@src/app/config/config.service";
import {PlatformService} from "@service/platform.service";
import { HelpService } from '../../help.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.less']
})
export class ContactUsComponent implements OnInit {

  constructor(
    public config: ConfigService,
    public platform: PlatformService,
    public service: HelpService
  ) { }

  ngOnInit() {
  }

}
