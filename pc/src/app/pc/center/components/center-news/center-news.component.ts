import {Component, OnInit} from '@angular/core';
import {UserService} from "@service/user.service";
import {NzMessageService} from 'ng-zorro-antd';
import {ResponseBody, ResponseList} from "@src/app/types/common.type";
import {getDate} from '@src/app/util/date';

@Component({
    selector: 'app-center-news',
    templateUrl: './center-news.component.html',
    styleUrls: ['./center-news.component.less']
})
export class CenterNewsComponent implements OnInit {
    //消息导航
    public newsIndex: number = 0;
    // 消息列表
    public msgData: ResponseList = null;
    //选择参数
    public params = {
        pageNo: 1,
        pageSize: 10,
        status: 0,   //  0-全部 1-未读 2已读
        bdate: getDate(0),
        edate: getDate(0)
    };
    // 懒加载状态
    public loading: boolean = false;
    //模态框
    public showMsg = false;
    //模态框弹出的内容
    public alertMsg: { message: string } = null;

    constructor(
      public user: UserService,
      public message: NzMessageService
    ) {}

    ngOnInit() {
        // 初始化当天信息
        this.getMessage();
    }

    // 按条件筛选
    getMessageByType(type: string, val: number) {
      if (type === 'date') { //日期
        this.params.pageNo = 1;
        this.params.bdate = getDate(val);
      } else if (type === 'type') { //类型
        this.params.pageNo = 1;
        this.params.status = this.newsIndex = val;
      } else if (type === 'page') { //页码
        this.params.pageNo = val;
      }
      this.getMessage();
    }

    // 获取消息
    getMessage() {
        this.loading = true;
        this.user.getMessageList(this.params).subscribe((res: ResponseList) => {
          if (res) {
                this.msgData = res;
            } else {
                this.msgData = null;
            }
        }, error => { console.log(error); },
          () => { this.loading = false; });
    }

    //获取消息内容
    showMessage(value): void {
      this.loading = true;
      this.user.getMessageInfo({id: value}).subscribe((res: ResponseBody) => {
        if (res.status === 10000) {
          this.alertMsg = res.data;
          this.showMsg = true;
          // 如果此消息是未读消息 => 更新用户信息中的未读信息数量
          if (res.data.status === '0') {
            this.user.userInfo.unread -= 1;
          }
        } else {
          this.alertMsg = null;
          this.message.error(res.msg);
        }
      }, error => { console.log(error); },
        () => { this.loading = false; });
    }

    handleOk(): void {
      this.showMsg = false;
      this.getMessage();
    }

}
