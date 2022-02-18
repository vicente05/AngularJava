import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated() && this.isTokenExpirado()) {
            this.router.navigate(["/login"]);
            return false;
        }
        if (this.authService.isAuthenticated() && !this.isTokenExpirado()) {
            return true;
        }
		this.router.navigate(["/login"]);
      	return false;
    }


    private isTokenExpirado(): boolean {
        const token = this.authService.token;
        const payload = this.authService.obtenerDatosToken(token);
        const now = new Date().getTime() / 1000;
        return payload.exp < now ? true : false;

    }
  
}
