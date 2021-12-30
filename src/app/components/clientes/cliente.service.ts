import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { CrudService } from 'src/app/services/crud.service';
import { Clientes } from './clientes';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { pageableI } from 'src/app/common/interfaces/pageable';
import { Region } from './region';


@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<Clientes> {

    urlApi =  environment.apiRest + '/clientes';

    constructor(private router: Router, protected http: HttpClient) { super(http) }

    getRegiones(): Observable<Region[]> {
        return this.http.get<Region[]>(this.urlApi + '/regiones');
    }

    create(cliente: Clientes) {
        return super.create(cliente).pipe(
            catchError( (e: HttpErrorResponse) => {
                if (e.status == 400) {
                    return throwError(e);
                }
                console.error(e.error.mensaje);
                Swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            }),
            map((response: any) => response.cliente as Clientes))
    }

    update(cliente: Clientes, id: number) {
        return super.update(cliente, id).pipe(
            catchError( (e: HttpErrorResponse)  => {
                if (e.status == 400) {
                    return throwError(e);
                }
                console.error(e.error.mensaje);
                Swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            }),
            map((response: any) => response.cliente as Clientes));
    }

    delete(id: number) {
        return super.delete(id).pipe(
                catchError( (e: HttpErrorResponse) => {
                console.error(e.error.mensaje);
                Swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            })
        )
    }

    getSingle(id: number) {
        return super.getSingle(id).pipe(
            catchError( (e: HttpErrorResponse)  => {
                this.router.navigate(["/clientes"]);
                console.error(e.error.mensaje);
                Swal.fire('Error al editar', e.error.mensaje, 'error');
                return throwError(e);
            })
        )
    }

    getClientes() {
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

    getClientesPage(page: number): Observable<any> {
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

    subirFoto(archivo: File, id: number): Observable<HttpEvent<any>> {
        let formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("id", id.toString());
        return this.http.post(`${environment.apiRest}/clientes/upload`, formData, { reportProgress: true, observe: 'events' })
            .pipe(
                delay(1000),
                catchError( (e: HttpErrorResponse) => {
                    console.error(e.error.mensaje);
                    Swal.fire(e.error.mensaje, e.error.error, 'error');
                    return throwError(e);
                }
            ))

    }

}
