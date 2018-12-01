import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../Services/authentication.service';
import {Observable, of} from "rxjs";
import {BsModalService} from "ngx-bootstrap";
import {catchError} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService, private modalService: BsModalService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        const token = this.authService.getToken();

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((error: any): Observable<any> => {

                console.log(error);

                if (error.status === 404) {
                    this.authService.logout();
                    this.modalService.hide(1);
                }

                return Observable.create();
            })
        );
    }

}
