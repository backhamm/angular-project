import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appLimitInput]'
})
export class LimitInputDirective {
    // 正则表达式
    @Input() limitType: string;

    // 限制输入的正则表达式
    _regexp: RegExp;

    // 输入是否完成，主要针对中文输入
    isComposite: boolean = false;

    constructor(
        private el: ElementRef,
        private control: NgControl,
    ) {
    }

    /**
     * compositionstart 浏览器输入开始
     */
    @HostListener('compositionstart') onCompositionStart() {
        this.isComposite = true;
    }

    /**
     * compositionend 浏览器输入结束（确定输入或取消输入）
     */
    @HostListener('compositionend', ['$event']) onCompositionEnd($event) {
        this.isComposite = false;
        this.limitInput($event);
    }

    @HostListener('change') onChange() {
        this.control.control.patchValue(this.el.nativeElement.value);
    }

    /**
     * 应对输入被格式化导致不接发change事件的问题。所以这里在blur的时候也进行重新赋值
     * @param $event
     */
    @HostListener('blur', ['$event']) onBlur($event) {
        this.control.control.patchValue(this.el.nativeElement.value);
    }

    /**
     * 正常输入
     */
    @HostListener('input', ['$event']) onInput($event) {
        this.limitInput($event);
    }

    private limitInput($event) {
        if (!this.el.nativeElement.value || this.isComposite) {
            return;
        }
        this._regexp = this.getRegexp(this.limitType);
        // 当前正则处理，以及空格处理
        this.el.nativeElement.value = this.el.nativeElement.value.replace(this._regexp, '').replace(/\s+/g, "");
    }

    private getRegexp(str) {
        let regexp;
        switch (str) {
            case 'letter': // 字母
                regexp = /[\W]/g;
                break;
            case 'number': // 数字
                regexp = /[^\d]/g;
                break;
            case 'number|letter':  // 数字或字母
                regexp = /[^\d|\w]/ig;
                break;
            case 'chinese': // 中文
                regexp = /[^\u4e00-\u9fa5|·]/g;
                break;
            case 'trim': // 中文
                regexp = /\s+/g;
                break;
            default:
                regexp = str;
        }
        return regexp;
    }
}
