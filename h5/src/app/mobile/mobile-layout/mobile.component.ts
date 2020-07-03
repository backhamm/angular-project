import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.less']
})
export class MobileComponent implements OnInit {
    goto = '/m/game/lottery'
  constructor() {

  }

  ngOnInit() {
      // 动态添加meta标签
      this.addMeta();
      // 设置rem
      this.setRem(document, window);
  }
  addMeta(): void {//手动添加mate标签
    let meta = document.createElement('meta');
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" viewport-fit=cover';
    document.getElementsByTagName('head')[0].appendChild(meta);
    //设置body背景色
    /*document.getElementsByTagName('html')[0].style.backgroundColor = '#15161c';
    document.getElementsByTagName('body')[0].style.backgroundColor = '#15161c';*/
  }

  setRem(doc, win): void {
      function resize() {
          let html = document.documentElement;
          const ww = window.innerWidth;
          html.style.fontSize = ww / 7.5 + "px";
      }
      window.onresize = resize;
      resize();
  }
}
