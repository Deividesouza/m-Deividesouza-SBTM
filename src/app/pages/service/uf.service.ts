import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UFservice {
    private apiUrl = `${environment.url}/uf/uf`;

    constructor(private http: HttpClient) {}

    getUF(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
