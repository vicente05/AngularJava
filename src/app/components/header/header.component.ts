import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

    titulo: string = 'App Angular'

    constructor(private authService: AuthService, private router: Router) { }

	public get authServiceGetter(): AuthService {
		return this.authService;
	}

	logout(): void {
		let username = this.authService.usuario.username;
		this.authService.logout();
		Swal.fire("Logout", `Hola ${username},has cerrado sesión con éxito!`, 'success');
		this.router.navigate(["/login"])
	}

}
