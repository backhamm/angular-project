import { Component, OnInit } from '@angular/core';
import {PlatformService} from "@service/platform.service";

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.less']
})
export class DrawingComponent implements OnInit {

  constructor(
    public platform: PlatformService,
  ) { }

  ngOnInit() {
  }

}
