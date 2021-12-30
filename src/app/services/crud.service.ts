import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

    protected urlApi!: string;
    protected httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(protected readonly http: HttpClient) { }

    create(form: T): Observable<T> {
        return this.http.post<T>(this.urlApi, form, { headers: this.httpHeaders });
    }

    update(form: T, id: number): Observable<T> {
        return this.http.put<T>(this.urlApi + "/" + id, form, { headers: this.httpHeaders });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<{ [key: string]: T }>(this.urlApi + "/" + id, { headers: this.httpHeaders });
    }

    getSingle(id: number): Observable<T> {
        return this.http.get<T>(this.urlApi + "/" + id, { headers: this.httpHeaders });
    }

    getArray(params?: HttpParams): Observable<T[]> {
        return this.http.get<T[]>(this.urlApi, { params, headers: this.httpHeaders });
    }


}
