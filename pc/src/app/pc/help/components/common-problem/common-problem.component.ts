import { Component, OnInit } from '@angular/core';
import {PlatformService} from "@service/platform.service";

@Component({
  selector: 'app-common-problem',
  templateUrl: './common-problem.component.html',
  styleUrls: ['./common-problem.component.less']
})
export class CommonProblemComponent implements OnInit {
  public currentIndex:number = 0
  constructor(
    public platform: PlatformService,
  ) { }

  ngOnInit() {
  }
}
