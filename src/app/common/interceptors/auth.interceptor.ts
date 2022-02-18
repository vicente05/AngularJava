import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError( (error: HttpErrorResponse) => {
                if (error.status == HttpStatusCode.Unauthorized) {
                    if (this.authService.isAuthenticated()) {
                        this.authService.logout();
                    }
                    this.router.navigate(["/login"]);
                }
                if (error.status == HttpStatusCode.Forbidden) {
                    Swal.fire('Accesso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
                    this.router.navigate(["/clientes"]);
                }

                return throwError(error);
            })
        );
    }
}
