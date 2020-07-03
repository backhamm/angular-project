import {AfterViewInit, Component, EventEmitter, OnInit, Output, ElementRef, ViewChild} from '@angular/core';
import {style, trigger, transition, animate} from "@angular/animations";

@Component({
  selector: 'app-mobile-sliding',
  templateUrl: './mobile-sliding.component.html',
  styleUrls: ['./mobile-sliding.component.less'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.4s', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class MobileSlidingComponent implements OnInit, AfterViewInit {
  @ViewChild('slideWrapper', null) slideWrapper: ElementRef<any>;
  @ViewChild('slideBlock', null) slideBlock: ElementRef<any>;
  @Output() callback = new EventEmitter();

  initLeftVal: number;
  leftVal: number = 0;
  maxLeft: number = null;
  isBreak = false;

  constructor() { }

  ngOnInit() {
    this.callback.emit(false);
  }

  ngAfterViewInit() {
    this.maxLeft = this.slideWrapper.nativeElement.clientWidth - this.slideBlock.nativeElement.clientWidth;
  }

  touchDown(e) {
    this.isBreak = false;
    this.initLeftVal = e.targetTouches[0].pageX;
  }

  touchMove(e) {
    if (this.leftVal !== this.maxLeft) {
      let leftVal = e.targetTouches[0].pageX - this.initLeftVal;
      if (leftVal < 0) {
        this.leftVal = 0;
      } else if (leftVal >= this.maxLeft) {
        this.leftVal = this.maxLeft;
        this.callback.emit(true);
      } else {
        this.leftVal = leftVal;
      }
    }
  }

  touchEnd() {
    this.isBreak = true;
    if (this.leftVal >= this.maxLeft) {
      this.leftVal = this.maxLeft;
    } else {
      this.leftVal = 0;
      this.callback.emit(false);
    }
  }

}
