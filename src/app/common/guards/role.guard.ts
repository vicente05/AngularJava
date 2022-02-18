import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
		if (!this.authService.isAuthenticated()) {
			this.router.navigate(["/login"])
			return false;
	  	}
		const role = route.data['role'] as string;
		if(this.authService.hasRole(role)) {
			return true;
		}
		Swal.fire('Accesso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
		this.router.navigate(["/clientes"]);
		return false;
	}
  
}
