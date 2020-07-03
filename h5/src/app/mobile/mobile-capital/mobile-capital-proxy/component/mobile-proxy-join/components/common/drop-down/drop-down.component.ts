import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.less']
})
export class DropDownComponent implements OnInit {
  @ViewChild('listContent', null) listContent: ElementRef;

  @Input() isLoading: boolean;
  @Output() moveEnd = new EventEmitter();

  // 是否可以下拉
  public isMove = false;
  // 下拉结束
  public isEnd = false;
  // 下拉刷新需要的参数
  public initMoveNum = 0;
  public moveVal = 0;
  public isRequest = 0;
  public step = ['下拉加载更多', '释放刷新', '加载中', '加载完成', '暂无更多数据'];
  public icoList = ['loading', 'check', 'exclamation-circle'];

  constructor() { }

  ngOnInit() {
  }

  touchDown(e) {
    this.isEnd = false;
    this.isMove = !this.listContent.nativeElement.scrollTop && !this.isLoading;
    this.isMove && (this.initMoveNum = e.targetTouches[0].pageY);
    !this.moveVal && (this.isRequest = 0);
  }

  touchMove(e) {
    if (this.isMove && this.isRequest <= 1) {
      this.moveVal = e.targetTouches[0].pageY - this.initMoveNum;
      this.isRequest = this.moveVal > 50 ? 1 : 0;
    }
  }

  touchEnd() {
    this.isEnd = true;
    if (this.isMove && this.isRequest <= 1) {
      if (this.moveVal > 50) {
        this.isRequest = 2;
        this.moveVal = 50;
        this.moveEnd.emit((noData = false) => {
          setTimeout(() => {
            this.isRequest = noData ? 3 : 4;
            setTimeout(() => {
              this.moveVal = 0;
            }, 500);
          }, 500);
        });
      } else {
        this.moveVal = 0;
      }
    }
  }

}
