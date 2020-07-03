import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-scan-pay-result',
    templateUrl: './scan-pay-result.component.html',
    styleUrls: ['./scan-pay-result.component.less']
})
export class ScanPayResultComponent implements OnChanges {
    constructor() {
    }

    @Input() scanPayment: {
        viewType: string,   // 返回类型
        data: string,
        orderNo: string,   // 单号
        amount: number,    // 金额
        username: string   // 用户名
    };

    ngOnChanges() {
        // 表单提交
      if (this.scanPayment && this.scanPayment.viewType === 'form') {
            this.formSubmit();
        }
    }

    /**
     *  表单提交
     */
    formSubmit() {
      let ifr = document.createElement('iframe');
      ifr.width = '100%';
      ifr.height = '100%';

      let html = this.scanPayment.data;
      html = html.replace('<body', '<div');
      html = html.replace(/body>$/, 'div>');
      let form = document.getElementById('form');
      form.style.height = '100%';
      form.innerHTML = '';
      form.appendChild(ifr);
      ifr.contentDocument.write(html);
      (<HTMLFormElement>ifr.contentDocument.getElementById('actform')).submit();
    }
}
