import {Injectable} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {MulValidate} from '@src/app/types/common.type';

export const _Reg: any = {
  username: {
    //reg: /^((?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}|1[3456789]\d{9})$/, // 登录用户名
    reg: /\w+/, // 登录用户名
    message: '用户名由6-11数字和字母组合',
    placeholder: '请输入用户名/手机号'
  },
  registerName: {
    reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}$/, // 快速注册用户名
    message: '请输入真实的姓名',
    placeholder: '请输入用户名'
  },
  password: {
    reg: /^[0-9A-Za-z]{1,30}$/, // 密码
    message: '密码由6-12位字母或数字组合',
    placeholder: '请输入密码'
  },
  referralCode: {
    reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,15}$/, // 推荐码
    message: '请输入正确的推荐码',
    placeholder: '请输入推荐码(选填)'
  },
  realName: {
    reg: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, // 真实姓名  2到20位汉字，中间可以加点
    message: '请输入真实的姓名',
    placeholder: '请输入姓名'
  },
  mobile: {
    reg: /^1[2-9][0-9]{9}$/, // 手机号
    message: '请输入正确的手机号',
    placeholder: '请输入手机号'
  },
  code: {
    reg: /^[0-9]{4}$/, // 验证码
    message: '请输入正确的验证码',
    placeholder: '请输入四位数的验证码'
  },
  email: {
    reg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,  // email
    message: '请输入正确的Email',
    placeholder: '请输入Email'
  },
  card: {
    reg: /^[0-9]{14,20}$/, // 卡号
    message: '请输入正确的卡号',
    placeholder: '请输入卡号'
  },
  cardNum: {
    reg: /^[0-9]{14,20}$/,  // 银行卡号
    message: '请输入正确的银行卡号',
    placeholder: '请输入银行卡号'
  },
  orderCode: {
    reg: /^[0-9]{4}$/, // 订单号
    message: '请输入正确的订单号',
    placeholder: '请输入四位数的订单号'
  },
  weChat: {
    reg: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/, // 微信
    message: '请输入正确的微信',
    placeholder: '请输入微信'
  },
  qq: {
    reg: /^[0-9]{4,15}$/, // qq
    message: '请输入正确的QQ',
    placeholder: '请输入QQ'
  },
  withdrawPassword: {
    reg: /^[0-9]{4}/, // 提款密码
    message: '请输入四位数字的提款密码',
    placeholder: '请输入四位数字的提款密码'
  }
};

@Injectable({
    providedIn: 'root'
})

export class Validate {
    constructor(
        public message: NzMessageService
    ) {}

  /**
   * 单个验证
   * @param regName  所需验证的名称
   * @param val  所需验证的值
   * @use  singleValidateFn(regName: string, val: string | number)
   */
  singleValidateFn(regName: string, val: any): boolean {
    const current = _Reg[regName];
    if (!current.reg.test(val)) {
      this.message.error(current.message);
      return false;
    }
    return true;
  }

  /**
   * 多个验证
   * @param arr  数组
   * @use  mulValidateFn([{ regName:string, val:string | number }])
   */
  mulValidateFn(arr: Array<MulValidate>): boolean {
    return arr.every(item => {
      const current = _Reg[item.regName];
      const bol = current.reg.test(item.val);
      if (!bol) {
        this.message.error(current.message);
      }
      return bol;
    });
  }

  /**
   * 注册推荐码验证
   * @param val
   * @return {Boolean}
   */
  recommendCode_validate( val: any ): Boolean {
      if (!!val && !_Reg.referralCode.reg.test(val)) {
        this.message.error(_Reg.referralCode.message);
        return false;
      }
      return true;
  }
}
