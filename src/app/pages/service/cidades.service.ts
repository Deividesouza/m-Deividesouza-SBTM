import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class Cidadesservice {
    private apiUrl = `${environment.url}/cidades/cidades`;

    constructor(private http: HttpClient) {}

    getCidades(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
