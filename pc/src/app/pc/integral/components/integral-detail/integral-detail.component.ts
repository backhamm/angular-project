import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { IntagralService } from '@service/intagral.service';
import {AddressOptions} from '@src/app/util/addressOptions';

@Component({
    selector: 'app-integral-detail',
    templateUrl: './integral-detail.component.html',
    styleUrls: ['./integral-detail.component.less']
})

export class IntegralDetailComponent implements OnInit {
    @Input() goodData: any;
    @Output() private childOuter = new EventEmitter();
    //三级联动地址
    public nzOptions: any[] | null = null;
    public validateForm: FormGroup;
    //兑换商品数量
    public goodNumber: number = 1;
    public userIntegral: number = 0;

    constructor(
        public fb: FormBuilder,
        public message: NzMessageService,
        public addressOptions: AddressOptions,
        public service: IntagralService
    ) { }

    ngOnInit() {
        //地址三级联动
        this.nzOptions = this.addressOptions.options;
        //定义验证
        this.validateForm = this.fb.group({
            area: [
                ['北京市', '市辖区', '东城区'], [Validators.required]
            ],
            address: [
                null, [Validators.required]
            ],
            receiver: [
                null, [Validators.required]
            ],
            phoneNum: [
                null, [Validators.required, Validators.pattern('^[1][2-9][0-9]{9}$')]
            ],
            mark: [
                '', []
            ]
        });
    }
    get area() {
        return this.validateForm.get('area');
    }
    get address() {
        return this.validateForm.get('address');
    }
    get receiver() {
        return this.validateForm.get('receiver');
    }
    get phoneNum() {
        return this.validateForm.get('phoneNum');
    }
    get mark() {
        return this.validateForm.get('mark');
    }
    /**
     * @description: 表单提交，兑换商品
     * @author: table
     */
    submitForm(): void {

        let integral = this.goodData.integral;
        //判定积分是否足够
        if (integral < this.goodData.price * this.goodNumber) {
            this.message.error('您的积分余额不足！');
            return;
        }

        const { valid, controls, value } = this.validateForm;
        if (!valid) {
            for (const i in controls) {
                if (controls[i]) {
                    controls[i].markAsDirty();
                    controls[i].updateValueAndValidity();
                }
            }
            return;
        }
        let params: any = {
            id: this.goodData.id,
            deliverPhone: value.phoneNum,
            deliverAddress: value.area.join('') + value.address,
            deliverRmk: value.mark||'',
            num: this.goodNumber,
            deliverName: value.receiver
        };
        this.service.exchangeGood(params).subscribe(res => {
            if (res.status === 10000) {
                //关闭弹窗
                this.childOuter.emit(false);
                this.message.success('兑换成功！');
                //重置表单
                this.validateForm.reset();
            } else {
                this.message.error(res.msg);
            }
        });
    }

    /**
     * @description: 改变商品数量
     * @author: table
     * @param {boolean} bol true => +; false => -
     */
    changeNum(bol: boolean): any {
        return bol ? this.goodNumber++ : this.goodNumber > 1 ? this.goodNumber-- : '';
    }
}
