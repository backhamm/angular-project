import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mobile-proxy-notjoin',
  templateUrl: './mobile-proxy-notjoin.component.html',
  styleUrls: ['./mobile-proxy-notjoin.component.less']
})
export class MobileProxyNotjoinComponent implements OnInit {

  carouselList = [
    {username: "erq***01", amount: 1369.07},
    {username: "erq***03", amount: 9081.92},
    {username: "tes***22", amount: 3111.19},
    {username: "ttx***03", amount: 143.06},
    {username: "erq***02", amount: 3922.30},
    {username: "erq***01", amount: 3079.42},
    {username: "bin***23", amount: 110.00},
    {username: "bin***23", amount: 300.00},
    {username: "bin***23", amount: 300.00},
    {username: "bin***23", amount: 200.00}
  ];

  constructor() {
  }

  ngOnInit() {
    this.carouselList = [...this.carouselList, ...this.carouselList.slice(0, 2)];
  }

}
