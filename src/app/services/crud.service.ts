import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

    protected urlApi!: string;
    protected httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(protected readonly http: HttpClient) { }

    create(form: T, headers = this.httpHeaders): Observable<T> {
        return this.http.post<T>(this.urlApi, form, { headers });
    }

    update(form: T, id: number, headers = this.httpHeaders): Observable<T> {
        return this.http.put<T>(this.urlApi + "/" + id, form, { headers });
    }

    delete(id: number, headers = this.httpHeaders): Observable<any> {
        return this.http.delete<{ [key: string]: T }>(this.urlApi + "/" + id, { headers });
    }

    getSingle(id: number, headers = this.httpHeaders): Observable<T> {
        return this.http.get<T>(this.urlApi + "/" + id, { headers });
    }

    getArray(params?: HttpParams, headers = this.httpHeaders): Observable<T[]> {
        return this.http.get<T[]>(this.urlApi, { params, headers });
    }


}
