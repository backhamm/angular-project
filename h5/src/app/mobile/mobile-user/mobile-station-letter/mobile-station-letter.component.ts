import {Component, OnInit} from '@angular/core';
import {UserService} from "@service/user.service";
import {NzMessageService} from "ng-zorro-antd";
import {getDate} from "@src/app/util/date";
import {ResponseList} from "@src/app/types/common.type";

@Component({
    selector: 'app-mobile-station-letter',
    templateUrl: './mobile-station-letter.component.html',
    styleUrls: ['./mobile-station-letter.component.less'],
})
export class MobileStationLetterComponent implements OnInit {

    constructor(private user: UserService, private message: NzMessageService) {
    }

    public msgData: any = [];
    //请求参数
    private parmas: any = {
        status: '',
        bdate: getDate(-30),
        edate: getDate(0),
        pageNo: 1,
        pageSize: 100
    };
    private messageContent: string = '';
    public isLoading: boolean = false;

    ngOnInit() {
        this.getMessageList();

    }

    // 获取当前消息的内容
    getMessageInfo(id, index, item): void {
        const {showMsg} = item;
        if (showMsg) {
            item.showMsg = false;
            return;
        }
        this.isLoading = true;
        this.user.getMessageInfo({id}).subscribe(res => {
            if (res.status === 10000) {
                // 所有的showMsg还原，打开当前的showMsg，修改当前的status值，改变当前的消息体
                this.msgData.forEach(every => every.showMsg = false);
                item.showMsg = true;
                const {status, message} = res.data;
                // 修改当前站内信内容以及修改消息状态值
                item.status = "1";
                this.messageContent = message;
            }
        }, null, () => this.isLoading = false);
    }

    // 获取站内信的列表
    getMessageList(): void {
        this.isLoading = true;
        this.user.getMessageList(this.parmas).subscribe((res: ResponseList) => {
            if (res.list) {
                // 数据绑定一个showMsg属性，来显示与隐藏详情
                this.msgData = res.list.map(item => ({...item, showMsg: false}));
            }
        }, null, () => this.isLoading = false);
    }

}
