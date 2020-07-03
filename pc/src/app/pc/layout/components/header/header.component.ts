import {Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@src/app/service/authentication.service';
import {NzModalService} from 'ng-zorro-antd';
import {CommonService} from '@service/common.service';
import {UserService} from "@service/user.service";
import {GameService} from "@service/game.service";
import {NavigationEnd, Router} from "@angular/router";
import { ConfigService } from '@src/app/config/config.service';
import {PlatformService} from "@service/platform.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    constructor(
        public auth: AuthenticationService,
        public modalService: NzModalService,
        public game: GameService,
        public user: UserService,
        public common: CommonService,
        public router: Router,
        public plat: PlatformService,
        public comfig: ConfigService
    ) {
        this.router.events.subscribe((data) => {
            if (data instanceof NavigationEnd) {
                const routerArr = data.url.split('/');
                this.game.navList(routerArr[routerArr.length - 1]);
            }
        });
    }

    get navGameList() {
      return this.game.navGameList;
    }

    ngOnInit() {}
    subClick(data: any, link: string, index: number) {
        if (data.hasSub) {
            this.router.navigate([link]);
            const { url } = data;
            if (url === 'electronic') {
                this.game.changeElecIndex(index);
            }

        } else {
            this.game.loadGame({ gameCode: data.gameCode, gameId: data.gameId });
        }
    }

}


