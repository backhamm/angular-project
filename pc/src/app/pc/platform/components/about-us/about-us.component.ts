import { Component, OnInit } from '@angular/core';
import {PlatformService} from "@service/platform.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.less']
})
export class AboutUsComponent implements OnInit {

  constructor(
    public platform: PlatformService
  ) { }

  ngOnInit() {
  }

}
