import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '@service/authentication.service';

/**
 * 用户中心路由守卫
 */
@Injectable({
    providedIn: 'root'
})
export class AuthCenterGuard implements CanActivate {

    constructor(public auth: AuthenticationService) {
    }

    /**
     * 路由守卫
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.auth.isAuth;
    }
}
