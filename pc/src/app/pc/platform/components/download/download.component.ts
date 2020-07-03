import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@src/app/config/config.service';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.less']
})
export class DownloadComponent implements OnInit {

  constructor(public config:ConfigService) { }

  ngOnInit() {
  }


}
