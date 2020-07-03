import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlatformService} from '@service/platform.service';

@Component({
    selector: 'app-discount-detail',
    templateUrl: './discount-detail.component.html',
    styleUrls: ['./discount-detail.component.less']
})
export class DiscountDetailComponent implements OnInit {

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public service: PlatformService
    ) {
    }

    ngOnInit() {
    }

    get currentImg() {
          let index = this.route.snapshot.paramMap.get('id');
          const discountList = this.service.webComConfig.filter(item => !item ||  item.type === '4');
          return discountList.length ? discountList[0].configs[index].htmlImg : '';
    }

}
