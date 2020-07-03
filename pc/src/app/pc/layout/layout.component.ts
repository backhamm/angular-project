import { Component, OnInit } from '@angular/core';
import { CommonService } from "@service/common.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class PcLayoutComponent implements OnInit {

  constructor(public common: CommonService, 
     ) { }
  
  ngOnInit() { }

}
