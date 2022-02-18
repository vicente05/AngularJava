import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { CrudService } from 'src/app/services/crud.service';
import { Clientes } from './clientes';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { pageableI } from 'src/app/common/interfaces/pageable';
import { Region } from './region';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<Clientes> {

    urlApi =  environment.apiRest + '/clientes';

    constructor(
        private router: Router, 
        protected http: HttpClient, 
        private authService: AuthService
    ) { super(http) }

    private isNoAutorizado(e: HttpErrorResponse): boolean {
        if (e.status == 401 || e.status == 403) {
            this.router.navigate(["/login"])
            return true;
        }
        return false;
    }

    private agregarAuthorizationHeader(): HttpHeaders {
        let token = this.authService.token;
        if (token != null) {
            return this.httpHeaders.append('Authorization', 'Bearer ' + token);
        }

        return this.httpHeaders;
    }

    public getRegiones(): Observable<Region[]> {
        return this.http.get<Region[]>(this.urlApi + '/regiones', { headers: this.agregarAuthorizationHeader() }).pipe(
            catchError((e: HttpErrorResponse) => {
                this.isNoAutorizado(e);
                return throwError(e);
            })
        );
    }

    public create(cliente: Clientes) {
        return super.create(cliente, this.agregarAuthorizationHeader()).pipe(
            catchError( (e: HttpErrorResponse) => {
                if (this.isNoAutorizado(e)) {
                    return throwError(e);
                }
                if (e.status == 400) {
                    return throwError(e);
                }
                console.error(e.error.mensaje);
                Swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            }),
            map((response: any) => response.cliente as Clientes))
    }

    public update(cliente: Clientes, id: number) {
        return super.update(cliente, id, this.agregarAuthorizationHeader()).pipe(
            catchError( (e: HttpErrorResponse)  => {
                if (this.isNoAutorizado(e)) {
                    return throwError(e);
                }
                if (e.status == 400) {
                    return throwError(e);
                }
                console.error(e.error.mensaje);
                Swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            }),
            map((response: any) => response.cliente as Clientes));
    }

    public delete(id: number) {
        return super.delete(id, this.agregarAuthorizationHeader()).pipe(
            catchError( (e: HttpErrorResponse) => {
                if (this.isNoAutorizado(e)) {
                    return throwError(e);
                }
                console.error(e.error.mensaje);
                Swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            })
        )
    }

    public getSingle(id: number) {
        return super.getSingle(id, this.agregarAuthorizationHeader()).pipe(
            catchError( (e: HttpErrorResponse)  => {
                if (this.isNoAutorizado(e)) {
                    return throwError(e);
                }
                this.router.navigate(["/clientes"]);
                console.error(e.error.mensaje);
                Swal.fire('Error al editar', e.error.mensaje, 'error');
                return throwError(e);
            })
        )
    }

    public getClientes() {
        return super.getArray().pipe(
            tap( response => {
                console.log(ClienteService.name + ': tap 1');
                let clientes = response as Clientes[];
                clientes.forEach(cliente => console.log(cliente.nombre));
            }),
            map( response => {
                let clientes = response as Clientes[];
                return clientes.map( cliente => {
                    cliente.nombre = cliente.nombre.toUpperCase();
                    let datePipe = new DatePipe('es');
                    //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
                    //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
                    return cliente;
                });
            }),
            tap( response => {
                console.log(ClienteService.name + ': tap 2');
                response.forEach(cliente => console.log(cliente.nombre));
            })
        );
    }

    public getClientesPage(page: number): Observable<any> {
        return this.http.get<pageableI<Clientes>>(environment.apiRest + '/clientes/page/' + page).pipe(
            tap( response => {
                console.log(ClienteService.name + ': tap 1');
                (response.content as Clientes[]).forEach(cliente => console.log(cliente.nombre));
            }),
            map( response => {
                (response.content as Clientes[]).map( cliente => {
                    cliente.nombre = cliente.nombre.toUpperCase();
                    let datePipe = new DatePipe('es');
                    return cliente;
                });

                return response as pageableI<Clientes>;
            }),
            tap( response => {
                console.log(ClienteService.name + ': tap 2');
                (response.content as Clientes[]).forEach(cliente => console.log(cliente.nombre));
            })
        );
    }

    public subirFoto(archivo: File, id: number): Observable<HttpEvent<any>> {
        let formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("id", id.toString());

        let headers = new HttpHeaders();
        let token = this.authService.token;
        if (token != null) {
            headers = headers.append('Authorization', 'Bearer ' + token);
        }

        return this.http.post(`${environment.apiRest}/clientes/upload`, formData, { reportProgress: true, observe: 'events', headers })
            .pipe(
                delay(1000),
                catchError( (e: HttpErrorResponse) => {
                    if (this.isNoAutorizado(e)) {
                        return throwError(e);
                    }
                    console.error(e.error.mensaje);
                    Swal.fire(e.error.mensaje, e.error.error, 'error');
                    return throwError(e);
                }
            ))

    }

}
