import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

    protected urlApi!: string;

    constructor(protected readonly http: HttpClient) { }

    create(form: T): Observable<T> {
        return this.http.post<T>(this.urlApi, form);
    }

    update(form: T, id: number): Observable<T> {
        return this.http.put<T>(this.urlApi + "/" + id, form);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<{ [key: string]: T }>(this.urlApi + "/" + id);
    }

    getSingle(id: number): Observable<T> {
        return this.http.get<T>(this.urlApi + "/" + id);
    }

    getArray(params?: HttpParams): Observable<T[]> {
        return this.http.get<T[]>(this.urlApi, { params });
    }


}
