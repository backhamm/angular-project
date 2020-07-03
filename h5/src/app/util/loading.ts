/*
 * @Description: loading
 * @author: table
 * @Date: 2019-07-08 19:51:07
 * @LastEditTime: 2019-07-08 20:02:58
 */
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Loading {
    txWindow: any;

    /**
     * @description: 打开新窗口
     * @author: table
     */
    openWindow(): any {
        this.txWindow = window.open();
        const html = `
            <div class="loader">
                <div>l</div>
                <div>o</div>
                <div>a</div>
                <div>d</div>
                <div>i</div>
                <div>n</div>
                <div>g</div>
            </div>`;
        const style = `
            <style>
                body{
                    background:#020c1f;
                }
                .loader{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    -moz-transform: translate(-50%, -50%);
                    -mos-transform: translate(-50%, -50%);
                    -o-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    text-align: center;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    cursor: default;
                    min-width: 33.25em;
                }
                .loader div{
                    position: relative;
                    width: 2.5em;
                    height: 2.5em;
                    background: #fff;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                    margin: 0 5px;
                    float: left;
                    font-size: 1.65em;
                    line-height: 2.5em;
                    color: #fff;
                    -webkit-animation: bounce 1.5s infinite ease-in-out;
                    -moz-animation: bounce 1.5s infinite ease-in-out;
                    -mos-animation: bounce 1.5s infinite ease-in-out;
                    -o-animation: bounce 1.5s infinite ease-in-out;
                    animation: bounce 1.5s infinite ease-in-out;
                }
                .loader div:after{
                    position: absolute;
                    bottom: -2em;
                    left: 0.35em;
                    width: 1.8em;
                    height: 0.5em;
                    background: #322b27;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
                .loader div:nth-child(1){
                    -webkit-animation: bouncefirst 1.5s infinite ease-in-out;
                    -moz-animation: bouncefirst 1.5s infinite ease-in-out;
                    -mos-animation: bouncefirst 1.5s infinite ease-in-out;
                    -o-animation: bouncefirst 1.5s infinite ease-in-out;
                    animation: bouncefirst 1.5s infinite ease-in-out;
                    -webkit-animation-delay: 0ms;
                    -moz-animation-delay: 0ms;
                    -ms-animation-delay: 0ms;
                    -o-animation-delay: 0ms;
                    animation-delay: 0ms;
                    background: #DB2F00;
                }
                .loader div:nth-child(2){
                    -webkit-animation-delay: 50ms;
                    -moz-animation-delay: 50ms;
                    -ms-animation-delay: 50ms;
                    -o-animation-delay: 50ms;
                    animation-delay: 50ms;
                    background: #ff6d37;
                }
                .loader div:nth-child(3){
                    -webkit-animation-delay: 100ms;
                    -moz-animation-delay: 100ms;
                    -ms-animation-delay: 100ms;
                    -o-animation-delay: 100ms;
                    animation-delay: 100m;
                    background: #ffa489;
                }
                .loader div:nth-child(4){
                    -webkit-animation-delay: 150ms;
                    -moz-animation-delay: 150ms;
                    -ms-animation-delay: 150ms;
                    -o-animation-delay: 150ms;
                    animation-delay: 150ms;
                    background: #f2f2f2;
                    color: #555;
                }
                .loader div:nth-child(5){
                    webkit-animation-delay: 200ms;
                    -moz-animation-delay: 200ms;
                    -ms-animation-delay: 200ms;
                    -o-animation-delay: 200ms;
                    animation-delay: 200ms;
                    background: #99d3d4;
                }
                .loader div:nth-child(6){
                    -webkit-animation-delay: 250ms;
                    -moz-animation-delay: 250ms;
                    -ms-animation-delay: 250ms;
                    -o-animation-delay: 250ms;
                    animation-delay: 250ms;
                    background: #56bebf;
                }
                .loader div:nth-child(7){
                    -webkit-animation-delay: 300ms;
                    -moz-animation-delay: 300ms;
                    -ms-animation-delay: 300ms;
                    -o-animation-delay: 300ms;
                    animation-delay: 300ms;
                    background: #13A3A5;
                }
                @-webkit-keyframes bouncefirst {
                    0% { -webkit-transform: translateX(0px); } 
                20% { -webkit-transform: translateX(-50px); } 
                25% { -webkit-transform: translateX(-50px); } 
                50% { -webkit-transform: translateX(100px); } 
                    80%,100% { -webkit-transform: translateX(0px); } 
                }
                
                @-moz-keyframes bouncefirst {
                    0% { -moz-transform: translateX(0px); } 
                20% { -moz-transform: translateX(-50px); } 
                25% { -moz-transform: translateX(-50px); } 
                50% { -moz-transform: translateX(100px); } 
                    80%,100% { -moz-transform: translateX(0px); } 
                }
                
                @-mos-keyframes bouncefirst {
                    0% { -mos-transform: translateX(0px); } 
                20% { -mos-transform: translateX(-50px); } 
                25% { -mos-transform: translateX(-50px); } 
                50% { -mos-transform: translateX(100px); } 
                    80%,100% { -mos-transform: translateX(0px); } 
                }
                
                @-o-keyframes bouncefirst {
                    0% { -o-transform: translateX(0px); } 
                20% { -o-transform: translateX(-50px); } 
                25% { -o-transform: translateX(-50px); } 
                50% { -o-transform: translateX(100px); } 
                    80%,100% { -o-transform: translateX(0px); } 
                }
                
                @keyframes bouncefirst {
                    0% { transform: translateX(0px); } 
                20% { transform: translateX(-50px); } 
                25% { transform: translateX(-50px); } 
                50% { transform: translateX(100px); } 
                    80%,100% { transform: translateX(0px); } 
                }
                @-webkit-keyframes bounce {
                    0% { -webkit-transform: translateX(0px); } 
                20% { -webkit-transform: translateX(0px); } 
                28% { -webkit-transform: translateX(0px); } 
                50% { -webkit-transform: translateX(100px); } 
                    80%,100% { -webkit-transform: translateX(0px); } 
                }
                
                @-moz-keyframes bounce {
                    0% { -moz-transform: translateX(0px); } 
                20% { -moz-transform: translateX(0px); } 
                28% { -moz-transform: translateX(0px); } 
                50% { -moz-transform: translateX(100px); } 
                    80%,100% { -moz-transform: translateX(0px); } 
                }
                
                @-mos-keyframes bounce {
                    0% { -mos-transform: translateX(0px); } 
                20% { -mos-transform: translateX(0px); } 
                28% { -mos-transform: translateX(0px); } 
                50% { -mos-transform: translateX(100px); } 
                    80%,100% { -mos-transform: translateX(0px); } 
                }
                
                @-o-keyframes bounce {
                    0% { -o-transform: translateX(0px); } 
                20% { -o-transform: translateX(0px); } 
                28% { -o-transform: translateX(0px); } 
                50% { -o-transform: translateX(100px); } 
                    80%,100% { -o-transform: translateX(0px); } 
                }
                
                @keyframes bounce {
                    0% { transform: translateX(0px); } 
                20% { transform: translateX(0px); } 
                28% { transform: translateX(0px); } 
                50% { transform: translateX(100px); } 
                    80%,100% { transform: translateX(0px); } 
                }
            </style>`;
        this.txWindow.document.body.innerHTML = '';

        this.txWindow.document.write(html);
        this.txWindow.document.head.innerHTML = style;
    }
}
