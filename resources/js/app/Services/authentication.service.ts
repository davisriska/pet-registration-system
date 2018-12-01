import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JWTHelper} from "../Helpers/jwt.helper";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
                private router: Router,
                private jwtHelper: JWTHelper,
    ) {

    }

    login(email: string, password: string) {
        return this.http.post('/api/login', {email, password}
        ).pipe(tap(
            (response: TokenResponse) => {
                if (response && response.access_token) {
                    localStorage.setItem('pet-registration-system', JSON.stringify(response));
                }
            }
        ));
    }

    register(email: string, password: string, password_confirmation: string) {
        return this.http.post('/api/register', {email, password, password_confirmation}
        ).pipe(tap(
            (response: TokenResponse) => {
                if (response && response.access_token) {
                    localStorage.setItem('pet-registration-system', JSON.stringify(response));
                }
            }
        ));
    }

    logout(returnUrl: boolean = false) {
        localStorage.removeItem('pet-registration-system');

        if (returnUrl) {
            this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
        } else {
            this.router.navigate(['/login']);
        }
    }

    refresh() {
        return this.http.get('/api/refresh').subscribe((response: TokenResponse) => {
            if (response && response.access_token) {
                localStorage.setItem('pet-registration-system', JSON.stringify(response));
            }
        });
    }

    isLoggedIn() {
        return this.getToken() != null;
    }

    getToken() {
        const data = JSON.parse(localStorage.getItem('pet-registration-system'));

        return data ? data.access_token : null;
    }

    urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw new Error('Illegal base64url string!');
            }
        }
        return this.b64DecodeUnicode(output);
    }

    // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
    private b64DecodeUnicode(str: any) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), (c: any) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    decodeToken(token: string): any {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }

        return JSON.parse(decoded);
    }

    getTokenExpirationDate(token: string): Date {
        let decoded: any;
        decoded = this.decodeToken(token);

        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }

        const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    isTokenExpired(token: string, offsetSeconds?: number): boolean {
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (date == null) {
            return false;
        }

        // Token expired?
        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }

}
