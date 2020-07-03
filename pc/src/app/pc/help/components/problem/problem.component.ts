import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HelpService } from '../../help.service';

@Component({
    selector: 'app-problem',
    templateUrl: './problem.component.html',
    styleUrls: ['./problem.component.less']
})
export class ProblemComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public service: HelpService,
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                //获取展示数据
                let id = this.route.snapshot.params.id;
                this.showData = id ? this.service[id] : [];
                let nav: any = {};
                this.service.navList.map(item => {
                    if (item.children && item.children.length > 0) {
                        let rtn = item.children.find(child => child.params === id);
                        if (rtn) {
                            nav = rtn;
                        }
                    } else {
                        if (item.params === id) {
                            nav = item;
                        }
                    }
                });
                this.showType = nav ? nav.type : '';
            }
        });
    }

    //显示数据
    showData: any[] = [];

    //数据显示方式
    showType: string = '';

    ngOnInit() {
    }

}
