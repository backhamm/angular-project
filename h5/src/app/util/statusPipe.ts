import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'StatusPipe'})
export class StatusPipe implements PipeTransform {
    status: any = {
        1 : '成功',
        2: '失败',
        3: '处理中'
    }
    type: any = {
        1: '存款',
        2: '提款',
        3: '转账',
        4: '加款',
        5: '扣款',
        6: '彩金',
        7: '优惠',
        8: '返水',
        9: '活动'
    }
    transform(num: any, isType: boolean = false): any {
        const value = isType ? this.type[num] : this.status[num];
        return value;
    }
}
