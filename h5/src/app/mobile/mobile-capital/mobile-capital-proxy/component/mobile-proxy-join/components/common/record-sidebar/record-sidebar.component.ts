import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-record-sidebar',
  templateUrl: './record-sidebar.component.html',
  styleUrls: ['./record-sidebar.component.less'],
  animations: [
    trigger('showMask', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms', style({opacity: 0}))
      ])
    ]),
    trigger('showContent', [
      transition(':enter', [
        style({right: '-4.6rem'}),
        animate('200ms', style({right: 0}))
      ]),
      transition(':leave', [
        animate('200ms', style({right: '-4.6rem'}))
      ])
    ])
  ]
})
export class RecordSidebarComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @Input() isShow: boolean;
  @Output() isShowChange = new EventEmitter();
  @Input() btnList: Array<any>;
  @Input() typeList: Array<any>;

  startTime: Date = new Date();
  endTime: Date = new Date();
  public btnIndex: number;
  public type: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.btnIndex = this.btnList && this.btnList[0].type;
  }

  disabledStartDate = (startTime: Date): boolean => {
    if (!startTime || !this.endTime) {
      return false;
    }
    return startTime.getTime() > this.endTime.getTime();
  }

  disabledEndDate = (endTime: Date): boolean => {
    if (!endTime || !this.startTime) {
      return false;
    }
    return endTime.getTime() <= this.startTime.getTime();
  }

  cancelFun() {
    this.startTime = new Date();
    this.endTime = new Date();
    this.btnIndex = this.btnList[0].type;
    this.type = 0;
    this.cancel.emit();
  }

  confirmFun() {
    let startTime = this.startTime.toLocaleDateString().replace(/\//g, '-');
    let endTime = this.endTime.toLocaleDateString().replace(/\//g, '-');
    this.confirm.emit({
      startTime,
      endTime,
      btnIndex: this.btnIndex,
      typeIndex: this.type,
    });
  }
}
