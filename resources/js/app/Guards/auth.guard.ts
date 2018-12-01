import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from "../Services/authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthenticationService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            if (!this.authService.isLoggedIn()) {
                // not logged in so redirect to login page with the return url
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            }

            return false;
        }

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            if (!this.authService.isLoggedIn()) {
                // not logged in so redirect to login page with the return url
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            }

            return false;
        }
    }

}
